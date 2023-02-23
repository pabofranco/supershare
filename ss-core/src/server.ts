import { APIService, Messaging } from './services';
import { AuthRouter, MainRouter, UserRouter } from './routes';
import { server } from './config/Settings.json';
import { Irouter } from './interfaces';

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
