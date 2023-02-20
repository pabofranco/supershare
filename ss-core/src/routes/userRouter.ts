import { Router, Request, Response } from "express";
import { validationHelper } from "../helpers/validationHelper";
import { Irouter } from "../interfaces/Irouter";
import { IregisterParams } from "../interfaces/IregisterParams";
import UserController from "../controllers/userController";

class UserRouter implements Irouter {
    path: string;
    router: Router;
    controller: UserController;

    constructor() {
        this.path = '/users';
        this.router = Router();
        this.controller = new UserController();
    }
    
    configureRoutes(): void {
        this.router.post(this.path, this.insertUser);
    }

    async insertUser(request: Request, response: Response): Promise<Response> {
        // parameters validation
        const { error, message } = validationHelper.validateRegisterParams(request.body);
        if (error) {
            return response.status(400).json(message);  
        } 

        try {
            const userData = request.body as IregisterParams;
            const newUser = await this.controller.addUser(userData);

            if (newUser.error) {
                return response.status(500).json(newUser.data);
            }

            return response.status(200).json(newUser.data);
        } catch (ex) {
            return response.status(500).json(ex);
        }
    }
}

export default UserRouter;
