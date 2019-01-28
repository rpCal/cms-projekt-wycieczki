
import { createServer } from './server';
import { config as updateEnv } from 'dotenv';


const runApp = async () => {
    updateEnv();
    await createServer();
}

runApp();