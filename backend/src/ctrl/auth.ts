

import AppError from './../utils/AppError'
import { Request, Response, NextFunction } from "express";
import { OK, FORBIDDEN, NOT_FOUND,  NOT_ACCEPTABLE, ACCEPTED, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import Trip from './../models/Trip';
import User from './../models/User';
import { logger } from '../utils/logger';
import { inspect } from 'util';

export const postRegister = async (req: Request, res:Response, next: NextFunction) => {
    try{
      let _user = new User({
        Email: req.body.Email,
        Password: req.body.Password,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        IsAdmin: false,
      });
      let newUser = await _user.save();
      res.status(OK).json({ newUser });
    }catch(err){
      if (err.name === 'MongoError' && err.code === 11000) {
        next({ message: err.message, status: NOT_ACCEPTABLE, stack: err.stack } as AppError);
      }
      next({ message: err, status: INTERNAL_SERVER_ERROR, stack: err.stack } as AppError);
    }
}

export const postLogin = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const { Email, Password } = req.body;
        let user:any = await User.findOne({ "Email": Email });
        if(user == null){
        return next({ message: "User not found", status: NOT_ACCEPTABLE } as AppError);
        }
        user.comparePassword(Password, function (err, isMatch) {
        if(err){ 
            return next({ message: "Wrong password", status: NOT_ACCEPTABLE } as AppError);
            }
        if(isMatch){
            const secretOrKey = process.env.JWT_SECRET || 'secret';
            const token = jwt.sign({
            _id: user._id,
            Email: user.Email,
            FirstName: user.FirstName,
            LastName: user.LastName,
            }, secretOrKey, {
            expiresIn: 604800 //1w
            });
            res.status(OK).json({
            token: `JWT ${token}`,
            user: user.toJSON()
            })
        }else{
            return next({ message: "Wrong password", status: NOT_ACCEPTABLE } as AppError);
        }
        });
    }catch(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            next({ message: err.message, status: NOT_ACCEPTABLE, stack: err.stack } as AppError);
        }
        next({ message: err, status: INTERNAL_SERVER_ERROR, stack: err.stack } as AppError);
    }
};

export const getProfile = (req: any, res:Response, next: NextFunction) => {
    res.send({ user: req.user.toJSON() });
}

export const getHomePage = async (req:Request, res:Response, next: NextFunction) => {
    res.status(OK).send({ results: true })
}

// EXAMPLE: /public/Trip?limit=3&skip=0&sort_by_field=Price&sort_by_order=-1&where_Date=2019-12-20
export const getPublicTrip = async (req:Request, res:Response, next: NextFunction) => {
    try{
        let { 
            limit, 
            sort_by_field, 
            sort_by_order, 
            skip, 
            where_Name, 
            where_City,
            where_Date,
            where_Price,
            where_AvaiableNumberOfPlaces
        } = req.query;

        let sort;
        if(!sort_by_field || !sort_by_order){
            sort = {Promote: 1, AverageRating: 1, createdAt: -1}
        }else{
            sort = {[sort_by_field]: sort_by_order};
        }
        if(!skip){
            skip = 0
        }else{
            skip = parseInt(skip, 10);
        }
        if(!limit){
            limit = 10
        }else{
            limit = parseInt(limit, 10);
        }
        let WHERE = {}

        WHERE['$or'] = [
            { Archive: { $exists: false } },
            { Archive: false }
        ];

        if(where_Name != undefined){
            WHERE['Name'] = {$regex: '.*' + where_Name + '.*'};
        }
        if(where_City != undefined){
            WHERE['City'] = {$regex: '.*' + where_City + '.*'};;
        }
        if(where_Date != undefined){
            const selectedDate = new Date(`${where_Date}T19:38:34.203Z`);
            WHERE['DepartureDate'] = {"$gt": selectedDate};
            WHERE['ArrivalDate'] = {"$lt": selectedDate};
        }
        if(where_Price != undefined){
            WHERE['Price'] = {"$gte": parseFloat(where_Price)};
        }
        if(where_AvaiableNumberOfPlaces != undefined){
            WHERE['AvaiableNumberOfPlaces'] = {"$gte": parseInt(where_AvaiableNumberOfPlaces, 10)};
        }
        let results = await Trip.find(WHERE).skip(skip).limit(limit).sort(sort);
        res.status(OK).send({ results })
    }catch(err){
        return next({ message: err.message, status: NOT_ACCEPTABLE, stack: err.stack } as AppError);
    }
}



export const postLogout = async (req:Request, res:Response, next: NextFunction) => {
    res.status(OK).send({ results: true })
}