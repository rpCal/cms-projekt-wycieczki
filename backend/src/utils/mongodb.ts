import mongoose from 'mongoose';
import { logger } from './logger';

let connection;
const createDatabaseConnection = async () => {
    connection = await mongoose.connect(process.env.MONGODB_URI || "mongodb://", {useNewUrlParser: true});
    logger.info(`Successfully connected to MongoDB.`);
}

export {
    createDatabaseConnection, 
    connection
};