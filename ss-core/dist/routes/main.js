"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
class MainRouter {
    constructor() {
        this.controller = controllers_1.MainController;
        this.basePath = '/api/v1/main';
        this.router = (0, express_1.Router)();
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get('/health', this.controller.healthCheck);
        this.router.get('/describe/:table', this.controller.describeTable);
    }
}
exports.default = MainRouter;
//# sourceMappingURL=main.js.map