"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
class AuthRouter {
    constructor() {
        this.basePath = '/api/v1/auth';
        this.router = (0, express_1.Router)();
        this.controller = new authController_1.default();
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.post('/', this.controller.login);
        this.router.post('/recovery', this.controller.recovery);
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=authRouter.js.map