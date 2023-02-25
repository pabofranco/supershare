"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helpers_1 = require("helpers");
const Messaging_controller_1 = __importDefault(require("./Messaging.controller"));
class MessagingRouter {
    constructor() {
        this.controller = Messaging_controller_1.default;
        this.basePath = '/api/v1/messaging';
        this.router = (0, express_1.Router)();
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.use(helpers_1.authHelper.authenticateRequest);
        this.router.post('/', this.controller.createQueue);
        this.router.delete('/', this.controller.removeQueue);
        this.router.post('/publish', this.controller.publishMessage);
    }
}
exports.default = MessagingRouter;
//# sourceMappingURL=Messaging.router.js.map