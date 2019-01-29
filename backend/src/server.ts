import express from 'express';
import { Request, Response, NextFunction } from "express";
import { FORBIDDEN, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const expressStatusMonitor = require('express-status-monitor');

import { } from './utils/passport';
import {logger} from './utils/logger';
import appRoutes from './routes';


let APP;
const PORT = process.env.PORT || '5000';

const setupConfig = () => {
    const whitelist = ['https://rpcal.github.io', 'http://localhost:4200']
    const corsOptions = {
        origin: (origin, callback) =>  {
            if (origin === undefined || whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            }else{
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
    class MorganLoggerStream { write(text: string) {logger.info(text) } }
    APP.use(morgan('dev', { stream: new MorganLoggerStream() }));
    APP.use(cors(corsOptions));
    APP.use(compression());
    APP.use(expressStatusMonitor());
    APP.use(bodyParser.json())
    APP.use(bodyParser.urlencoded({ extended: false }))
    APP.use(express.static('public'));
    APP.disable('x-powered-by');
    APP.use(session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
        store: new MongoStore({
            url: process.env.MONGODB_URI,
            autoReconnect: true,
        })
    }));
    APP.use(passport.initialize());
    APP.use(passport.session());
}

const setupRoutes = () => {
    // ROUTES
    APP.use("", appRoutes);
    APP.options('*', cors())

    // error handler for all the applications
    APP.use((err:Error, req:Request, res:Response, next: NextFunction) => {
        let code, message;
        switch (err.name) {
            case "UnauthorizedError":
            case "UnauthorizedAccessError":
                code = UNAUTHORIZED;
                message = "You don't have access to this part of app";
                break;
            case "BadRequestError":
            case "NotFoundError":
                code = NOT_FOUND;
                message = err.message;
                break;
            default:
                code = INTERNAL_SERVER_ERROR
                message = "Internal Server Error"
                break;
        }

        res.status(code).send({
            type: code, 
            message: message
        });
    });

    // handle not found url
    APP.use((req:Request, res:Response, next: NextFunction) => {
        res.status(NOT_FOUND).send({ type: "Not Found", message: `Route not found` });
    });

}


const createServer = async () => {

    APP = express();
    
    setupConfig();
    setupRoutes();
    
    APP.listen(PORT, () => logger.info(`Server listening on port ${PORT}!`));
};

export {
    createServer
}