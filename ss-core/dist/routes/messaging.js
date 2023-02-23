"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helpers_1 = require("../helpers");
const controllers_1 = require("../controllers");
class MessagingRouter {
    constructor() {
        this.controller = controllers_1.MessagingController;
        this.basePath = '/api/v1/messaging';
        this.router = (0, express_1.Router)();
    }
    configureRoutes() {
        this.router.use(helpers_1.authHelper.authenticateRequest);
        this.router.post('/', this.controller.createQueue);
        this.router.delete('/', this.controller.removeQueue);
        this.router.post('/publish', this.controller.publishMessage);
    }
}
exports.default = MessagingRouter;
//# sourceMappingURL=messaging.js.map