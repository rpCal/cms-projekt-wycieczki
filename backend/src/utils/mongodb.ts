import mongoose from 'mongoose';
import { logger } from './logger';

let connection;
const createDatabaseConnection = async () => {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://";
    connection = await mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
    logger.info(`Successfully connected to MongoDB.`);
}

export {
    createDatabaseConnection, 
    connection
};