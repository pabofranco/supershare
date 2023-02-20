import DatabaseService from './services/databaseService';
import LoggerService from './services/loggerService';
import APIService from './services/apiService';
import MainRouter from './routes/mainRouter';
import UserRouter from './routes/userRouter';
import AuthRouter from './routes/authRouter';
import { server, database } from './config/Settings.json';
import { IapiOptions } from './interfaces/IapiOptions';
import { Irouter } from './interfaces/Irouter';

// init helpers
DatabaseService.getInstance(database.connection);
LoggerService.getInstance();

const controllers: Irouter[] = [
    new MainRouter(),
    new UserRouter(),
    new AuthRouter(),
];

// start server
const superShare = new APIService(server as IapiOptions, controllers);
superShare.startServer();
