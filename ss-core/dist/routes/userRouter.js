"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
class UserRouter {
    constructor() {
        this.basePath = '/api/v1/users';
        this.router = (0, express_1.Router)();
        this.controller = new userController_1.default();
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
//# sourceMappingURL=userRouter.js.map