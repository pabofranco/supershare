import { Router } from "express";
import MainController from "../controllers/mainController";
import { Irouter } from "../interfaces/Irouter";

class MainRouter implements Irouter {
    path: string;
    router: Router;
    controller: MainController;

    constructor() {
        this.path = '/';
        this.router = Router();
        this.controller = new MainController();

        this.configureRoutes();
    }

    configureRoutes(): void {
        this.router.use(this.path, this.controller.indexRoute);
    }
}

export default MainRouter;
