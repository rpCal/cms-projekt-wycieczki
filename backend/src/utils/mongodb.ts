import mongoose from 'mongoose';

import logger from './logger';

let connection;

const connectMongoDb = async () => {

    connection = await mongoose.connect(process.env.MONGO_URI);

    connection
        .then(db => {
            logger.info(`Successfully connected to ${process.env.MONGO_URI} MongoDB.`);
            return db;
        })
        .catch(err => {
            if (err.message.code === 'ETIMEDOUT') {
                logger.info('Attempting to re-establish database connection.');
                mongoose.connect(process.env.MONGO_URI);
            } else {
                logger.error('Error while attempting to connect to database:');
                logger.error(err);
            }
        });
    return connection
}

export default {
    connectMongoDb, 
    connection
};