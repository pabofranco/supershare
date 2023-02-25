require('module-alias/register');
import { Irouter } from 'interfaces';
import { API, Messaging } from 'services';
import { server } from './config/Settings.json';
import AuthRouter  from './endpoints/auth/Auth.router';
import MainRouter from './endpoints/main/Main.router';
import UserRouter from './endpoints/user/User.router';
import MessagingRouter from './endpoints/messaging/Messaging.router';

// init services
Messaging.start();

const routes: Irouter[] = [
    new MainRouter(),
    new UserRouter(),
    new AuthRouter(),
    new MessagingRouter(),
];

// start server
const superShare = new API(server, routes);
superShare.startServer();
