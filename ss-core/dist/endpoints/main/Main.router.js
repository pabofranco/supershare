"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Main_controller_1 = __importDefault(require("./Main.controller"));
class MainRouter {
    constructor() {
        this.controller = Main_controller_1.default;
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
//# sourceMappingURL=Main.router.js.map