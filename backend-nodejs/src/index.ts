import express from 'express';
import {Request, Response, NextFunction} from "express";
import { OK } from 'http-status-codes';
import * as bodyParser from 'body-parser';
import cors from 'cors';
const APP = express();
const PORT = process.env.PORT || '5000';

// Config
var whitelist = ['https://rpcal.github.io', 'http://localhost:4200']
var corsOptions = {
    origin: (origin, callback) =>  {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}
APP.use(bodyParser.json())
APP.use(bodyParser.urlencoded({ extended: false }))
APP.use(express.static('public'));
APP.use(cors(corsOptions))

// ROUTES
APP.get('/', (req:Request, res:Response, next: NextFunction) => res.status(OK).send({ status: 'Hello World' }))

// SERVER
APP.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))