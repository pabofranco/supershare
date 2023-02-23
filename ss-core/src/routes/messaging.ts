import { Router } from 'express';
import { Irouter } from '../interfaces';
import { authHelper } from '../helpers';
import { MessagingController } from '../controllers';

class MessagingRouter implements Irouter {
    basePath: string;
    router: Router;
    controller = MessagingController;

    constructor() {
        this.basePath = '/api/v1/messaging';
        this.router = Router();
    }

    configureRoutes(): void {
        this.router.use(authHelper.authenticateRequest);
        this.router.post('/', this.controller.createQueue);
        this.router.delete('/', this.controller.removeQueue);
        this.router.post('/publish', this.controller.publishMessage);
    }
}

export default MessagingRouter;
