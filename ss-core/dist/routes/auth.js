"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
class AuthRouter {
    constructor() {
        this.controller = controllers_1.AuthController;
        this.basePath = '/api/v1/auth';
        this.router = (0, express_1.Router)();
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.post('/', this.controller.login);
        this.router.post('/recovery', this.controller.recovery);
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=auth.js.map