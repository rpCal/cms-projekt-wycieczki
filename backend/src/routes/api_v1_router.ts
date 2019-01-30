import express from 'express';
import restify from 'express-restify-mongoose';

import _Trip from './../models/Trip';
import _Rating from './../models/Rating';
import _User from './../models/User'; 
import _Reservation from './../models/Reservation';

const router = express.Router();

restify.serve(router, _Trip);
restify.serve(router, _Rating);
restify.serve(router, _User);
restify.serve(router, _Reservation);

export default router;