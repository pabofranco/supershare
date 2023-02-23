"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
class UserRouter {
    constructor() {
        this.controller = controllers_1.UserController;
        this.basePath = '/api/v1/users';
        this.router = (0, express_1.Router)();
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get('/', this.controller.list);
        this.router.post('/', this.controller.insert);
        this.router.put('/', this.controller.update);
        this.router.delete('/', this.controller.remove);
    }
}
exports.default = UserRouter;
//# sourceMappingURL=user.js.map