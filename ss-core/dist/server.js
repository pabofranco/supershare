"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bparser = require('body-parser');
const cors = require('cors');
const { server } = require('./config/Settings.json');
const configureServer = () => {
    superShare.use(bparser.json());
    superShare.use(cors());
};
const configureRoutes = () => {
    // routes
    const mainRoute = require('./routes/main');
    const authRoute = require('./routes/auth');
    // route-binding
    superShare.use('/', mainRoute);
    superShare.use('/auth', authRoute);
};
const startServer = () => {
    const { host, port } = server;
    configureServer();
    configureRoutes();
    superShare.listen(port, host, () => {
        console.log(`API online at http://${host}:${port}`);
    });
};
const superShare = (0, express_1.default)();
startServer();
//# sourceMappingURL=server.js.map