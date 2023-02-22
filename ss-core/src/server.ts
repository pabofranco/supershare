import Messaging from './services/messagingService';
import APIService from './services/apiService';
import MainRouter from './routes/mainRouter';
import UserRouter from './routes/userRouter';
import AuthRouter from './routes/authRouter';
import { server } from './config/Settings.json';
import { Irouter } from './interfaces/Irouter';

// init services
Messaging.start();

const routes: Irouter[] = [
    new MainRouter(),
    new UserRouter(),
    new AuthRouter(),
];

// start server
const superShare = new APIService(server, routes);
superShare.startServer();
