import { Router } from 'express';
import { Irouter } from 'interfaces';
import UserController from './User.controller';

class UserRouter implements Irouter {
    basePath: string;
    router: Router;
    controller = UserController;

    constructor() {
        this.basePath = '/api/v1/users';
        this.router = Router();

        this.configureRoutes();
    }

    configureRoutes(): void {
        this.router.get('/', this.controller.list);
        this.router.post('/', this.controller.insert);
        this.router.put('/', this.controller.update);
        this.router.delete('/', this.controller.remove);
    }
}

export default UserRouter;
