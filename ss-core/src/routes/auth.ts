import { Router } from 'express';
import { AuthController } from '../controllers';
import { Irouter } from "../interfaces";

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
