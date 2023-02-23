"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainController_1 = __importDefault(require("../controllers/mainController"));
class MainRouter {
    constructor() {
        this.controller = mainController_1.default;
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
//# sourceMappingURL=mainRouter.js.map