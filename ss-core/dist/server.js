"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("./services");
const routes_1 = require("./routes");
const Settings_json_1 = require("./config/Settings.json");
// init services
services_1.Messaging.start();
const routes = [
    new routes_1.MainRouter(),
    new routes_1.UserRouter(),
    new routes_1.AuthRouter(),
];
// start server
const superShare = new services_1.APIService(Settings_json_1.server, routes);
superShare.startServer();
//# sourceMappingURL=server.js.map