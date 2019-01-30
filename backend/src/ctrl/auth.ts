

import AppError from './../utils/AppError'
import { Request, Response, NextFunction } from "express";
import { OK, FORBIDDEN, NOT_FOUND,  NOT_ACCEPTABLE, ACCEPTED, INTERNAL_SERVER_ERROR} from 'http-status-codes';

import Trip from './../models/Trip';
import User from './../models/User';

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
    res.status(OK).send({ results: await Trip.find().limit(10).sort({created: -1}) })
  }

