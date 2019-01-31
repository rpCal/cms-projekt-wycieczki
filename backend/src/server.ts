import express from 'express';
import { Request, Response, NextFunction } from "express";
import { FORBIDDEN, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import passport from 'passport';
import expressStatusMonitor from 'express-status-monitor';
import methodOverride from 'method-override'
import { inspect } from 'util';

import passportJwt from './utils/passport'
import {logger} from './utils/logger';
import AppError from './utils/AppError';
import appRoutes from './routes';

let APP;
const PORT = process.env.PORT || '5000';

const setupConfig = () => {
    const whitelist = [
        'https://rpcal.github.io', // production
        'http://localhost', // development
        'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop' //postman
    ];
    const corsOptions = {
        origin: (origin, callback) =>  {
            logger.info("Jaki adres?");
            logger.info(origin);
            logger.info(inspect((whitelist.indexOf(origin) !== -1)));
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
    APP.use(methodOverride())
    APP.use(bodyParser.json())
    APP.use(bodyParser.urlencoded({ extended: false }))
    APP.use(express.static('public'));
    APP.disable('x-powered-by');
    APP.use(passport.initialize());
    APP.use(passport.session());
    passportJwt(passport);
}
const setupRoutes = () => {
    // ROUTES
    APP.use("", appRoutes);
    APP.options('*', cors())

    // error handler for all the applications
    APP.use((err:AppError, req:Request, res:Response, next: NextFunction) => {
        const appError: AppError = {
            message: err.message, 
            status: err.status,
            stack: err.stack
        }
        logger.error(inspect(err));
        res.status(err.status).send(appError);
    });

    // handle not found url
    APP.use((req:Request, res:Response, next: NextFunction) => {
        res.status(NOT_FOUND).send({ 
            name: "Not Found", 
            message: `Route not found`, 
            status: NOT_FOUND } as AppError);
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