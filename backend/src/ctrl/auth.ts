

import AppError from './../utils/AppError'
import { Request, Response, NextFunction } from "express";
import { OK, FORBIDDEN, NOT_FOUND,  NOT_ACCEPTABLE, ACCEPTED, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import Trip from './../models/Trip';
import User from './../models/User';
import { logger } from '../utils/logger';
import { inspect } from 'util';
import Rezerwation from './../models/Reservation';
import Rating from './../models/Rating';
import { not, string, empty, object, validate } from 'joi';

export const postRegister = async (req: Request, res:Response, next: NextFunction) => {
    try{

        let requestSchema = object().keys({
            Email:    string().min(4).email().required(),
            Password: string().min(5).required(),
            FirstName:string().min(2).required(),
            LastName: string().min(2).required(),
        });
        
        let validation = validate(req.body, requestSchema);

        if(validation.error != null){
            return next({ message: "Przekazane parametry są bledne", status: NOT_ACCEPTABLE } as AppError);
        }

        let { Email, Password, FirstName, LastName } = req.body;
        
        let user:any = await User.findOne({ "Email": Email });

        if(user != null){
            return next({ message: "User with that email exists", status: NOT_ACCEPTABLE } as AppError);
        }

        let _user = new User({
            Email: Email,
            Password: Password,
            FirstName: FirstName,
            LastName: LastName,
            IsAdmin: false,
        });


        let newUser = await _user.save();

        res.status(OK).json({ results: newUser });
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
                    IsAdmin: user.IsAdmin,
                }, secretOrKey, {
                    expiresIn: 604800 //1w
                });

                res.status(OK).json({
                    results: {
                        token: `JWT ${token}`,
                        user: user.toJSON()
                    }
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
    res.send({ results: req.user.toJSON() });
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
            where_id,
            where_Name, 
            where_City,
            where_Date,
            where_Price,
            where_Promote,
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

        if(where_id != undefined){
            WHERE['_id'] = where_id;
        }
        
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
        if(where_Promote != undefined){
            WHERE['Promote'] = {"$gte": parseInt(where_Promote)};
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

export const postRezerwation = async (req:any, res:Response, next: NextFunction) => {
    try{
        let { TripId, NumberOfPlaces } = req.body;

        if(!TripId){
            return next({ message: "Trip Id is wrong", status: NOT_ACCEPTABLE } as AppError);
        }

        if(!NumberOfPlaces){
            return next({ message: "NumberOfPlaces is wrong", status: NOT_ACCEPTABLE } as AppError);
        }
        
        let trip = await Trip.findById(TripId);

        if(!trip){
            return next({ message: "cant find trip by passed id", status: NOT_ACCEPTABLE } as AppError);
        }

        NumberOfPlaces = parseInt(NumberOfPlaces);

        if(trip['AvaiableNumberOfPlaces'] < NumberOfPlaces){
            return next({ message: "too many numer of places", status: NOT_ACCEPTABLE } as AppError);
        }

        let rezerwation = await Rezerwation.create({
            Trip: trip._id,
            User: req.user._id,
            IsPayed: false,
            NumberOfPlaces: NumberOfPlaces
        });

        if(!rezerwation){
            return next({ message: "cant create rezerwation by passed trip and user", status: NOT_ACCEPTABLE } as AppError);
        }

        trip['AvaiableNumberOfPlaces'] = trip['AvaiableNumberOfPlaces'] - NumberOfPlaces;
        
        await trip.save();
        
        res.status(OK).send({ 
            results: {
                rezerwation,
                trip
            } 
        })
    }catch(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            next({ message: err.message, status: NOT_ACCEPTABLE, stack: err.stack } as AppError);
        }
        next({ message: err, status: INTERNAL_SERVER_ERROR, stack: err.stack } as AppError);
    }
};


export const postRezerwationPay = async (req:any, res:Response, next: NextFunction) => {
    try{
        let { RezerwationId } = req.body;

        if(!RezerwationId){
            return next({ message: "RezerwationId is wrong", status: NOT_ACCEPTABLE } as AppError);
        }

        let rezerwation = await Rezerwation.findById(RezerwationId);

        if(!rezerwation){
            return next({ message: "cant find rezerwation by passed id", status: NOT_ACCEPTABLE } as AppError);
        }

        let userId = req.user.id; 

        if(rezerwation['User'] != userId){
            return next({ message: "you can only change your own rezerwation", status: NOT_ACCEPTABLE } as AppError);
        }

        rezerwation['IsPayed'] = true;
        
        await rezerwation.save();
        
        res.status(OK).send({ 
            results: rezerwation
        })
    }catch(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            next({ message: err.message, status: NOT_ACCEPTABLE, stack: err.stack } as AppError);
        }
        next({ message: err, status: INTERNAL_SERVER_ERROR, stack: err.stack } as AppError);
    }
}



export const postRezerwationCancel = async (req:any, res:Response, next: NextFunction) => {
    try{

        let { RezerwationId } = req.body;

        if(!RezerwationId){
            return next({ message: "RezerwationId is wrong", status: NOT_ACCEPTABLE } as AppError);
        }

        let rezerwation = await Rezerwation.findById(RezerwationId);

        if(!rezerwation){
            return next({ message: "cant find rezerwation by passed id", status: NOT_ACCEPTABLE } as AppError);
        }

        let trip = await Trip.findById(rezerwation['Trip']);

        if(!trip){
            return next({ message: "cant find trip by passed id", status: NOT_ACCEPTABLE } as AppError);
        }

        let userId = req.user.id; 

        if(rezerwation['User'] != userId){
            return next({ message: "you can only change your own rezerwation", status: NOT_ACCEPTABLE } as AppError);
        }

        let NumberOfPlaces = parseInt(rezerwation['NumberOfPlaces']);
        trip['AvaiableNumberOfPlaces'] = trip['AvaiableNumberOfPlaces'] + NumberOfPlaces;
        
        await trip.save();
        await Rezerwation.deleteOne({ _id: rezerwation._id });
        
        res.status(OK).send({ 
            results: true
        });
    }catch(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            next({ message: err.message, status: NOT_ACCEPTABLE, stack: err.stack } as AppError);
        }
        next({ message: err, status: INTERNAL_SERVER_ERROR, stack: err.stack } as AppError);
    }
}




export const postRating = async (req:any, res:Response, next: NextFunction) => {
    try{

        let { Comment, RateMark, TripId } = req.body;

        if(!Comment){
            return next({ message: "Comment is wrong", status: NOT_ACCEPTABLE } as AppError);
        }

        if(!RateMark){
            return next({ message: "RateMark is wrong", status: NOT_ACCEPTABLE } as AppError);
        }

        RateMark = parseInt(RateMark, 10);
        
        if(RateMark < 0 || RateMark > 6){
            return next({ message: "RateMark should be in values [0-6]", status: NOT_ACCEPTABLE } as AppError);
        }

        if(!TripId){
            return next({ message: "TripId is wrong", status: NOT_ACCEPTABLE } as AppError);
        }

        let trip = await Trip.findById(TripId);

        if(!trip){
            return next({ message: "cant find trip by passed id", status: NOT_ACCEPTABLE } as AppError);
        }

        let userId = req.user.id; 

        let rating = await Rating.create({
            Trip: trip.id,
            User: userId,
            Comment: Comment,
            RateMark: RateMark
        });

        if(!rating){
            return next({ message: "cant create rating", status: NOT_ACCEPTABLE } as AppError);
        }

        await __updateAverageRating();
        
        res.status(OK).send({ 
            results: {
                rating,
                trip
            }
        });
    }catch(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            next({ message: err.message, status: NOT_ACCEPTABLE, stack: err.stack } as AppError);
        }
        next({ message: err, status: INTERNAL_SERVER_ERROR, stack: err.stack } as AppError);
    }
}




export const deleteRating = async (req:any, res:Response, next: NextFunction) => {
    try{

        let { RatingId } = req.body;

        if(!RatingId){
            return next({ message: "RatingId is wrong", status: NOT_ACCEPTABLE } as AppError);
        }

        let rating = await Rating.findById(RatingId);

        if(!rating){
            return next({ message: "cant find rating by passed id", status: NOT_ACCEPTABLE } as AppError);
        }

        let trip = await Trip.findById(rating['Trip']);

        if(!trip){
            return next({ message: "cant find trip by passed id", status: NOT_ACCEPTABLE } as AppError);
        }

        let userId = req.user.id; 

        if(rating['User'] != userId){
            return next({ message: "you can only change your own ratings", status: NOT_ACCEPTABLE } as AppError);
        }

        await Rating.deleteOne({ _id: rating._id });
        await __updateAverageRating();

        res.status(OK).send({ 
            results: true
        });
    }catch(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            next({ message: err.message, status: NOT_ACCEPTABLE, stack: err.stack } as AppError);
        }
        next({ message: err, status: INTERNAL_SERVER_ERROR, stack: err.stack } as AppError);
    }
}


export const getRating = async (req:any, res:Response, next: NextFunction) => {
    try{
        let { TripId } = req.query;
        if(!TripId){
            return next({ message: "TripId is wrong", status: NOT_ACCEPTABLE } as AppError);
        }
        let results = await Rating.find({ Trip: TripId }).sort({ createdAt: -1 });
        res.status(OK).send({ results })
    }catch(err){
        return next({ message: err.message, status: NOT_ACCEPTABLE, stack: err.stack } as AppError);
    }
}


const __updateAverageRating = async () => {
    let averageRatings = await Rating.aggregate([
        { "$unwind": "$Trip" },
        { 
            "$group": {
                "_id": "$Trip",
                "RatingAvg": { "$avg": "$RateMark" }
            }
        }
    ]);
    if(averageRatings != null){
        for(let rating of averageRatings){
            let trip = await Trip.findById(rating['_id'])
            if(trip != null){
                trip['AverageRating'] = rating['RatingAvg'];
                await trip.save();
            }
        }   
    }
}

