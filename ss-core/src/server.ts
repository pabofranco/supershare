import express, { Express } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { server } from './config/Settings.json';
import { dbHelper } from './helpers/dbHelper';
import { logger } from './helpers/logger';

const configureServer = (): void => {
    superShare.use(json());
    superShare.use(cors());
};

const configureRoutes = (): void => {
    // routes
    const mainRoute = require('./routes/main');
    const authRoute = require('./routes/auth');
    
    // route-binding
    superShare.use('/', mainRoute);
    superShare.use('/auth', authRoute);
};

const startServer = (): void => {
    const { host, port } = server;

    // server configuration
    configureServer();    
    configureRoutes();
   
    superShare.listen(port, host, () => {
        console.log(`API online at http://${host}:${port}`);
    });
};

// init helpers
dbHelper.init();
logger.init();

// start server
const superShare: Express = express();
startServer();
