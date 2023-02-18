import express, { Express } from 'express';
const bparser = require('body-parser');
const cors = require('cors');
const { server } = require('./config/Settings.json');

const configureServer = (): void => {
    superShare.use(bparser.json());
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

    configureServer();    
    configureRoutes();
   
    superShare.listen(port, host, () => {
        console.log(`API online at http://${host}:${port}`);
    });
};

const superShare: Express = express();
startServer();
