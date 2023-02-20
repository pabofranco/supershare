import { Router, Request, Response } from "express";
import { validationHelper } from "../helpers/validationHelper";
import { Irouter } from "../interfaces/Irouter";
import { IregisterParams } from "../interfaces/IregisterParams";
import UserController from "../controllers/userController";
import { IuserInfo } from "../interfaces/IuserInfo";

class UserRouter implements Irouter<IuserInfo> {
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
        this.router.delete(this.path, this.deleteUser);
    }

    async insertUser(request: Request, response: Response): Promise<Response> {
        // parameters validation
        const { error, message } = validationHelper.validateRegisterParams(request.body);
        if (error) {
            return response.status(400).json(message);  
        } 

        try {
            const userData = request.body as IregisterParams;
            const newUser = await this.controller.insert(userData);

            if (newUser.error) {
                return response.status(500).json(newUser.data);
            }

            return response.status(200).json(newUser.data);
        } catch(ex) {
            return response.status(500).json(ex);
        }
    }

    async deleteUser(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        if (!id) {
            return response.status(400).json({ error: true, message: 'Invalid Id provided' });
        }

        try {
            const { error, data } = await this.controller.remove({ id });

            if (error) {
                return response.status(500).json({ error, message: data });
            }

            return response.status(200).json({ error, message: data });
        } catch(ex) {
            return response.status(500).json(ex);
        }
    }
}

export default UserRouter;
