import { Router } from 'express';
import { Irouter } from 'interfaces';
import AuthController from './Auth.controller';

class AuthRouter implements Irouter {
    basePath: string;
    router: Router;
    controller = AuthController;

    constructor() {
        this.basePath = '/api/v1/auth';
        this.router = Router();

        this.configureRoutes();
    }

    configureRoutes(): void {
        this.router.post('/', this.controller.login);
        this.router.post('/recovery', this.controller.recovery);
    }
}

export default AuthRouter;
