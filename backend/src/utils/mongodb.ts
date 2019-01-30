import mongoose from 'mongoose';
import { logger } from './logger';

let connection;
const createDatabaseConnection = async () => {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://";
    const MONGO_CONNECTION_OPTS = {
        useNewUrlParser: true, 
        useCreateIndex: true
    };
    connection = await mongoose.connect(MONGODB_URI, MONGO_CONNECTION_OPTS);
    logger.info(`Successfully connected to MongoDB.`);
}

export {
    createDatabaseConnection, 
    connection
};