"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const services_1 = require("services");
const Settings_json_1 = require("./config/Settings.json");
const Auth_router_1 = __importDefault(require("./endpoints/auth/Auth.router"));
const Main_router_1 = __importDefault(require("./endpoints/main/Main.router"));
const User_router_1 = __importDefault(require("./endpoints/user/User.router"));
// init services
services_1.Messaging.start();
const routes = [
    new Main_router_1.default(),
    new User_router_1.default(),
    new Auth_router_1.default(),
];
// start server
const superShare = new services_1.API(Settings_json_1.server, routes);
superShare.startServer();
//# sourceMappingURL=server.js.map