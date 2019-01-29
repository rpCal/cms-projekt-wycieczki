
import { createServer } from './server';
import { config as updateEnv } from 'dotenv';
import { createDatabaseConnection } from './utils/mongodb';
import { logger } from './utils/logger';

const runApp = async () => {
    logger.info('runApp :: try to create app');
    try{
        updateEnv();
        await createDatabaseConnection();
        await createServer();
    }catch(err){
        logger.error('runApp :: ', err)
    }
}

runApp();