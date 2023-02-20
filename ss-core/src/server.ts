import Database from './services/databaseService';
import Messaging from './services/messagingService';
import APIService from './services/apiService';
import MainRouter from './routes/mainRouter';
import UserRouter from './routes/userRouter';
import AuthRouter from './routes/authRouter';
import { server } from './config/Settings.json';
import { IapiOptions } from './interfaces/IapiOptions';
import { Irouter } from './interfaces/Irouter';

// init services
Database.start();
Messaging.start();

const controllers: Irouter[] = [
    new MainRouter(),
    new UserRouter(),
    new AuthRouter(),
];

// start server
const superShare = new APIService(server as IapiOptions, controllers);
superShare.startServer();
