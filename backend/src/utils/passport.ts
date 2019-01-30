
import passport from 'passport'; 
import { logger } from './logger';
import { Strategy, ExtractJwt }  from 'passport-jwt';
import User from './../models/User';
import { inspect } from 'util';
import AppError from './AppError';
import { NOT_ACCEPTABLE } from 'http-status-codes';
import { Request, Response, NextFunction } from "express";
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export default (passport) => {
  var opts: any = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.JWT_SECRET || 'secret';
  // opts.issuer = 'pjatk-travel-agency.herokuapp.com';
  // opts.audience = 'pjatk-travel-agency.herokuapp.com';
  passport.use(new Strategy(opts, (jwt_payload, done) => {
    User.findOne({"Email": jwt_payload.Email}, function(err, user) {
      if (err) { return done({ message: err, status: NOT_ACCEPTABLE, stack: null }, false); }
      if (user) { return done(null, user); }
      return done(null, false);
    });
  })); 
}


// if(!req.user){
//   return next({ message: "No user is passed", status: NOT_ACCEPTABLE, stack: null });
// }

export const getUserFromJWTToken = (req: any, res:Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user, failureOrInfo, status) => {
    if(err){
      return next({ message: err, status: NOT_ACCEPTABLE, stack: err.stack });
    }
    if(user === false){
      return next({ message: "JWT AUTH problem", status: NOT_ACCEPTABLE, stack: null });
    }
    req.user = user;
    next();
  })(req, res, next);
}