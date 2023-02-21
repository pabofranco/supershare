import { Router } from "express";
import MainController from "../controllers/mainController";
import { Irouter } from "../interfaces/Irouter";

class MainRouter implements Irouter {
    basePath: string;
    router: Router;
    controller: MainController;

    constructor() {
        this.basePath = '/api/v1/main';
        this.router = Router();
        this.controller = new MainController();

        this.configureRoutes();
    }

    configureRoutes(): void {
        this.router.get('/health', this.controller.healthCheck);
        this.router.get('/describe/:table', this.controller.describeTable);
    }
}

export default MainRouter;
