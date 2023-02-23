"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messagingController_1 = __importDefault(require("../controllers/messagingController"));
const authHelper_1 = require("../helpers/authHelper");
class MessagingRouter {
    constructor() {
        this.controller = messagingController_1.default;
        this.basePath = '/api/v1/messaging';
        this.router = (0, express_1.Router)();
    }
    configureRoutes() {
        this.router.use(authHelper_1.authenticateRequest);
        this.router.post('/', this.controller.createQueue);
        this.router.delete('/', this.controller.removeQueue);
        this.router.post('/publish', this.controller.publishMessage);
    }
}
exports.default = MessagingRouter;
//# sourceMappingURL=messagingRouter.js.map