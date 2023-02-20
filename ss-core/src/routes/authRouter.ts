import { Router } from 'express';
import { Irouter } from "../interfaces/Irouter";
import AuthController from '../controllers/authController';

class AuthRouter implements Irouter {
    path: string;
    router: Router;
    controller: AuthController;
    
    constructor() {
        this.path = '/auth';
        this.router = Router();
        this.controller = new AuthController();
    }

    configureRoutes(): void {
        this.router.post(this.path, this.controller.login);
        this.router.post(`${this.path}/recovery`, this.controller.recovery);
    }
}

export default AuthRouter;
