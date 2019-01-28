import express from 'express';
import {Request, Response, NextFunction} from "express";
import { OK } from 'http-status-codes'
import * as bodyParser from 'body-parser'
const APP = express();
const PORT = process.env.PORT || '5000';

// Config
APP.use(bodyParser.json())
APP.use(bodyParser.urlencoded({ extended: false }))
APP.use(express.static('public'));

// ROUTES
APP.get('/', (req:Request, res:Response, next: NextFunction) => res.status(OK).send({ status: 'Hello World' }))

// SERVER
APP.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))