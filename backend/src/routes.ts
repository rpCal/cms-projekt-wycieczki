import express from 'express';
import { Request, Response, NextFunction } from "express";
import { OK, FORBIDDEN, NOT_FOUND,  NOT_ACCEPTABLE, ACCEPTED, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import apiV1Router from './routes/api_v1_router';

import { 
  getUserFromJWTToken 
} from './utils/passport'
import { 
  postLogin,
  postLogout,
  postRegister, 
  getProfile,
  postProfile,
  getHomePage,
  getPublicTrip,
  postRezerwation,
  postRezerwationPay,
  postRezerwationCancel,
  postRating,
  deleteRating,
  getRating,
  getRezerwations
} from './ctrl/auth';

const router = express.Router();

router.get('/', getHomePage);
router.use(apiV1Router);
router.post('/auth/register', postRegister);
router.post('/auth/login', postLogin);
router.post('/auth/logout', postLogout);

router.get('/auth/profile', getUserFromJWTToken, getProfile);
router.post('/auth/profile', getUserFromJWTToken, postProfile);

router.get('/auth/Trip/Reservation/', getUserFromJWTToken, getRezerwations);
router.post('/auth/Reservation', getUserFromJWTToken, postRezerwation);
router.post('/auth/Reservation/pay', getUserFromJWTToken, postRezerwationPay);
router.post('/auth/Reservation/cancel', getUserFromJWTToken, postRezerwationCancel);
router.post('/auth/Reservation', getUserFromJWTToken, postRezerwation);

router.get('/auth/Rating', getUserFromJWTToken, getRating);
router.post('/auth/Rating', getUserFromJWTToken, postRating);
router.post('/auth/Rating/cancel', getUserFromJWTToken, deleteRating);

router.get('/public/Rating', getRating); 
router.get('/public/Trip', getPublicTrip);





export default router;




// import jwtMiddleware from 'express-jwt';
// const { check, validationResult } = require('express-validator/check');




// const { promisify } = require('util');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const passport = require('passport');
// const randomBytesAsync = promisify(crypto.randomBytes);

// let adminRouter = express.Router();
// adminRouter.use(jwtMiddleware({ 
//     secret: JWT_SECRET,
//     getToken: function (req) {
//         logger.info('JAKI MAM TOKEN', inspect(req.headers.authorization))
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { 
//             return req.headers.authorization.split(' ')[1];
//         } else if (req.query && req.query.token) {
//             return req.query.token;
//         } else if (req.cookies && req.cookies.token) {
//             return req.cookies.token;
//         }
//         return null; 
//     }
// }))
// adminRouter.get('/old_test',(req:Request, res:Response, next: NextFunction) => res.status(OK).send({ response: 'you are admin' }))


// appRoutes.use('/admin', adminRouter, (err:Error, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//       return res.status(FORBIDDEN).send({ type: err.name, message: err.message });
//   }
//   res.status(NOT_FOUND);
// });







// restify.serve(apiV1Router, mongoose.model('Customer', new mongoose.Schema({
//     name: { type: String, required: true },
//     comment: { type: String }
// })))
// restify.serve(apiV1Router, mongoose.model('Invoice', new mongoose.Schema({
//     customer: [{ type: mongoose.Schema.Types.ObjectId }],
//     products: [{ type: mongoose.Schema.Types.ObjectId }]
// })))

// {
//   access: (req) => {
//     logger.info(inspect(req));
//     if (req.isAuthenticated()) {
//       return req.user.isAdmin ? 'private' : 'protected'
//     } else {
//       return 'public'
//     }
//   }
// }


// const apiRouter = express.Router();
// restify.serve(appRoutes, Trip);
// restify.serve(appRoutes, mongoose.model('Invoice', new mongoose.Schema({
//   customer: [{ type: mongoose.Schema.Types.ObjectId }],
//   products: [{ type: mongoose.Schema.Types.ObjectId }]
// })))
// appRoutes.use('/api', apiRouter);

// await connection.dropDatabase();
// const MyModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
// await MyModel.create({ name: 'Val' }, { name: 'Varun' });
// // A cursor has a `.next()` function that returns a promise. The promise
// // will resolve to the next doc if there is one, or null if they are no
// // more results.
// const cursor = MyModel.find().sort({name: 1 }).cursor();
// for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
//   // Prints "Val" followed by "Varun"
//   logger.info(doc.name);
// }

// await Trip.create({ name: "Wycieczka w gory" }, { name: "Wycieczka do warszawy" });

// User.create({
//     name:"test"
// })

// const cursor = MyModel.find().sort({name: 1 }).cursor();

// let count = 0;
// console.log(new Date());
// await cursor.eachAsync(async function(doc) {
//   // Wait 1 second before printing first doc, and 0.5 before printing 2nd
//   await new Promise(resolve => setTimeout(() => resolve(), 1000 - 500 * (count++)));
//   console.log(new Date(), doc);
// });

// appRoutes.get('/auth/login', (req:Request, res:Response, next: NextFunction) => res.status(OK).send({ status: 'logged in' }))
// appRoutes.get('/test', (req:Request, res:Response, next: NextFunction) => res.status(OK).send({ status: 'You need to be logged in' }))

// appRoutes.post('/login', (req:Request, res:Response, next: NextFunction) => {
//     const {email, password} = req.body;
    
//     // var user = findUserSomehow(email, password);
    
//     var user = {
//         _id: "1"
//     };
//     var token = JWT.sign({ 
//       _id: user._id
//     }, JWT_SECRET, { expiresIn: '7d' });
    
//     logger.info('MAM TOKEN', token);
//     res.status(200).send({
//       user: user,
//       token: token
//     });
// });



// import {inspect} from 'util'
// /**
//  * POST /login
//  * Sign in using email and password.
//  */
// const postLogin = (req, res, next) => {
  
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }

//   // logger.info('mam wystarczajaco dancyh', inspect(user));
//   passport.authenticate('local', (err, user, info) => {
//     logger.info('logowanie sie powiodlo', inspect(err), inspect(user), inspect(info))
//     if (err) { return next(err); }
//     if (!user) {
//       return res.status(NOT_ACCEPTABLE).send({ msg: "Problem with user password" });
//     }
    
//     req.login(user, (err) => {
//       if (err) { return next(err); }
//       res.status(ACCEPTED).send({ msg: 'Success! You are logged in.'})
//     });
//   })(req, res, next);
// };
// // check('Email').isEmail(),
// //   check('Password').isLength({ min: 5 })
// appRoutes.post('/old_login', postLogin);







/**
 * GET /logout
 * Log out.
 */
// const getLogout = (req, res) => {
//   req.logout();
//   req.session.destroy((err) => {
//     if (err) console.log('Error : Failed to destroy the session during logout.', err);
//     req.user = null;
//   });
// };


/**
 * POST /signup
 * Create a new local account.
 */
// const postSignup = (req, res, next) => {
//   req.assert('email', 'Email is not valid').isEmail();
//   req.assert('password', 'Password must be at least 4 characters long').len(4);
//   req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
//   req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/signup');
//   }

//   const user = new User({
//     email: req.body.email,
//     password: req.body.password
//   });

//   User.findOne({ email: req.body.email }, (err, existingUser) => {
//     if (err) { return next(err); }
//     if (existingUser) {
//       req.flash('errors', { msg: 'Account with that email address already exists.' });
//       return res.redirect('/signup');
//     }
//     user.save((err) => {
//       if (err) { return next(err); }
//       req.logIn(user, (err) => {
//         if (err) {
//           return next(err);
//         }
//         res.redirect('/');
//       });
//     });
//   });
// };


/**
 * POST /account/profile
 * Update profile information.
 */
// const postUpdateProfile = (req, res, next) => {
//   req.assert('email', 'Please enter a valid email address.').isEmail();
//   req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/account');
//   }

//   User.findById(req.user.id, (err, user) => {
//     if (err) { return next(err); }
//     user.email = req.body.email || '';
//     user.profile.name = req.body.name || '';
//     user.profile.gender = req.body.gender || '';
//     user.profile.location = req.body.location || '';
//     user.profile.website = req.body.website || '';
//     user.save((err) => {
//       if (err) {
//         if (err.code === 11000) {
//           req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
//           return res.redirect('/account');
//         }
//         return next(err);
//       }
//       req.flash('success', { msg: 'Profile information has been updated.' });
//       res.redirect('/account');
//     });
//   });
// };

/**
 * POST /account/password
 * Update current password.
 */
// const postUpdatePassword = (req, res, next) => {
//   req.assert('password', 'Password must be at least 4 characters long').len(4);
//   req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/account');
//   }

//   User.findById(req.user.id, (err, user) => {
//     if (err) { return next(err); }
//     user.password = req.body.password;
//     user.save((err) => {
//       if (err) { return next(err); }
//       req.flash('success', { msg: 'Password has been changed.' });
//       res.redirect('/account');
//     });
//   });
// };

/**
 * POST /account/delete
 * Delete user account.
 */
// const postDeleteAccount = (req, res, next) => {
//   User.deleteOne({ _id: req.user.id }, (err) => {
//     if (err) { return next(err); }
//     req.logout();
//     req.flash('info', { msg: 'Your account has been deleted.' });
//     res.redirect('/');
//   });
// };
// function toTitleCase(str) {
//     return str.replace(/\w\S*/g,
//     txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
// };
/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
// const getOauthUnlink = (req, res, next) => {
//   const { provider } = req.params;
//   User.findById(req.user.id, (err, user) => {
//     if (err) { return next(err); }
//     const lowerCaseProvider = provider.toLowerCase();
//     const titleCaseProvider = toTitleCase(provider);
//     user[lowerCaseProvider] = undefined;
//     const tokensWithoutProviderToUnlink = user.tokens.filter(token =>
//       token.kind !== lowerCaseProvider);
//     // Some auth providers do not provide an email address in the user profile.
//     // As a result, we need to verify that unlinking the provider is safe by ensuring
//     // that another login method exists.
//     if (
//       !(user.email && user.password)
//       && tokensWithoutProviderToUnlink.length === 0
//     ) {
//       req.flash('errors', {
//         msg: `The ${titleCaseProvider} account cannot be unlinked without another form of login enabled.`
//           + ' Please link another account or add an email address and password.'
//       });
//       return res.redirect('/account');
//     }
//     user.tokens = tokensWithoutProviderToUnlink;
//     user.save((err) => {
//       if (err) { return next(err); }
//       req.flash('info', { msg: `${titleCaseProvider} account has been unlinked.` });
//       res.redirect('/account');
//     });
//   });
// };

/**
 * GET /reset/:token
 * Reset Password page.
 */
// const getReset = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return res.redirect('/');
//   }
//   User
//     .findOne({ passwordResetToken: req.params.token })
//     .where('passwordResetExpires').gt(Date.now())
//     .exec((err, user) => {
//       if (err) { return next(err); }
//       if (!user) {
//         req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
//         return res.redirect('/forgot');
//       }
//       res.render('account/reset', {
//         title: 'Password Reset'
//       });
//     });
// };

/**
 * POST /reset/:token
 * Process the reset password request.
 */
// const postReset = (req, res, next) => {
//   req.assert('password', 'Password must be at least 4 characters long.').len(4);
//   req.assert('confirm', 'Passwords must match.').equals(req.body.password);

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('back');
//   }

//   const resetPassword = () =>
//     User
//       .findOne({ passwordResetToken: req.params.token })
//       .where('passwordResetExpires').gt(Date.now())
//       .then((user) => {
//         if (!user) {
//           req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
//           return res.redirect('back');
//         }
//         user.password = req.body.password;
//         user.passwordResetToken = undefined;
//         user.passwordResetExpires = undefined;
//         return user.save().then(() => new Promise((resolve, reject) => {
//           req.logIn(user, (err) => {
//             if (err) { return reject(err); }
//             resolve(user);
//           });
//         }));
//       });

//   const sendResetPasswordEmail = (user) => {
//     if (!user) { return; }
//     let transporter = nodemailer.createTransport({
//       service: 'SendGrid',
//       auth: {
//         user: process.env.SENDGRID_USER,
//         pass: process.env.SENDGRID_PASSWORD
//       }
//     });
//     const mailOptions = {
//       to: user.email,
//       from: 'hackathon@starter.com',
//       subject: 'Your Hackathon Starter password has been changed',
//       text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
//     };
//     return transporter.sendMail(mailOptions)
//       .then(() => {
//         req.flash('success', { msg: 'Success! Your password has been changed.' });
//       })
//       .catch((err) => {
//         if (err.message === 'self signed certificate in certificate chain') {
//           console.log('WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.');
//           transporter = nodemailer.createTransport({
//             service: 'SendGrid',
//             auth: {
//               user: process.env.SENDGRID_USER,
//               pass: process.env.SENDGRID_PASSWORD
//             },
//             tls: {
//               rejectUnauthorized: false
//             }
//           });
//           return transporter.sendMail(mailOptions)
//             .then(() => {
//               req.flash('success', { msg: 'Success! Your password has been changed.' });
//             });
//         }
//         console.log('ERROR: Could not send password reset confirmation email after security downgrade.\n', err);
//         req.flash('warning', { msg: 'Your password has been changed, however we were unable to send you a confirmation email. We will be looking into it shortly.' });
//         return err;
//       });
//   };

//   resetPassword()
//     .then(sendResetPasswordEmail)
//     .then(() => { if (!res.finished) res.redirect('/'); })
//     .catch(err => next(err));
// };


/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
// const postForgot = (req, res, next) => {
//   req.assert('email', 'Please enter a valid email address.').isEmail();
//   req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/forgot');
//   }

//   const createRandomToken = randomBytesAsync(16)
//     .then(buf => buf.toString('hex'));

//   const setRandomToken = token =>
//     User
//       .findOne({ email: req.body.email })
//       .then((user) => {
//         if (!user) {
//           req.flash('errors', { msg: 'Account with that email address does not exist.' });
//         } else {
//           user.passwordResetToken = token;
//           user.passwordResetExpires = Date.now() + 3600000; // 1 hour
//           user = user.save();
//         }
//         return user;
//       });

//   const sendForgotPasswordEmail = (user) => {
//     if (!user) { return; }
//     const token = user.passwordResetToken;
//     let transporter = nodemailer.createTransport({
//       service: 'SendGrid',
//       auth: {
//         user: process.env.SENDGRID_USER,
//         pass: process.env.SENDGRID_PASSWORD
//       }
//     });
//     const mailOptions = {
//       to: user.email,
//       from: 'hackathon@starter.com',
//       subject: 'Reset your password on Hackathon Starter',
//       text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
//         Please click on the following link, or paste this into your browser to complete the process:\n\n
//         http://${req.headers.host}/reset/${token}\n\n
//         If you did not request this, please ignore this email and your password will remain unchanged.\n`
//     };
//     return transporter.sendMail(mailOptions)
//       .then(() => {
//         req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
//       })
//       .catch((err) => {
//         if (err.message === 'self signed certificate in certificate chain') {
//           console.log('WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.');
//           transporter = nodemailer.createTransport({
//             service: 'SendGrid',
//             auth: {
//               user: process.env.SENDGRID_USER,
//               pass: process.env.SENDGRID_PASSWORD
//             },
//             tls: {
//               rejectUnauthorized: false
//             }
//           });
//           return transporter.sendMail(mailOptions)
//             .then(() => {
//               req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
//             });
//         }
//         console.log('ERROR: Could not send forgot password email after security downgrade.\n', err);
//         req.flash('errors', { msg: 'Error sending the password reset message. Please try again shortly.' });
//         return err;
//       });
//   };

//   createRandomToken
//     .then(setRandomToken)
//     .then(sendForgotPasswordEmail)
//     .then(() => res.redirect('/forgot'))
//     .catch(next);
// };






































