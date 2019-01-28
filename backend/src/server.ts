import express from 'express';
import { Request, Response, NextFunction } from "express";
import { FORBIDDEN, NOT_FOUND } from 'http-status-codes';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import jwt from 'express-jwt';

import logger from './utils/logger';
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
    APP.use(morgan('combined', { stream: new MorganLoggerStream() }));
    APP.use(cors(corsOptions));
    APP.use(compression());
    APP.use(bodyParser.json())
    APP.use(bodyParser.urlencoded({ extended: false }))
    APP.use(express.static('public'));
    const publicPaths = [
        '/',
        '/auth/signup',
        '/auth/login',
        '/auth/forgot-password',
        '/auth/reset-password',
    ];
    APP.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: publicPaths }));
}

const setupRoutes = () => {
    // ERROR HANDLING
    APP.use(function (err:Error, req:Request, res:Response, next: NextFunction) {
        if (err.name === 'UnauthorizedError') {
        return res.status(FORBIDDEN).send({ type: err.name, message: err.message });
        }
        next(err);
    });
    APP.use(function(req:Request, res:Response, next: NextFunction) {
        res.status(NOT_FOUND).send({ type: "Not Found", message: `Route ${req.url} not found` });
    });

    // ROUTES
    APP.use(appRoutes);
    APP.options('*', cors())
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