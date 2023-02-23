import { Router } from "express";
import { Irouter } from "../interfaces";
import { MainController } from "../controllers";

class MainRouter implements Irouter {
    basePath: string;
    router: Router;
    controller = MainController;

    constructor() {
        this.basePath = '/api/v1/main';
        this.router = Router();

        this.configureRoutes();
    }

    configureRoutes(): void {
        this.router.get('/health', this.controller.healthCheck);
        this.router.get('/describe/:table', this.controller.describeTable);
    }
}

export default MainRouter;
