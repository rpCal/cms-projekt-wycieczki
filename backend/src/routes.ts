import express from 'express';
import {Request, Response, NextFunction} from "express";
import { OK, FORBIDDEN, NOT_FOUND } from 'http-status-codes';

const appRoutes = express.Router();

appRoutes.get('/', (req:Request, res:Response, next: NextFunction) => res.status(OK).send({ status: 'Hello World' }))
appRoutes.get('/auth/login', (req:Request, res:Response, next: NextFunction) => res.status(OK).send({ status: 'logged in' }))
appRoutes.get('/test', (req:Request, res:Response, next: NextFunction) => res.status(OK).send({ status: 'You need to be logged in' }))

export default appRoutes;