"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainController_1 = __importDefault(require("../controllers/mainController"));
class MainRouter {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.controller = new mainController_1.default();
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.use(this.path, this.controller.indexRoute);
    }
}
exports.default = MainRouter;
//# sourceMappingURL=mainRouter.js.map