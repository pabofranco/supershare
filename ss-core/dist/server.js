"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseService_1 = __importDefault(require("./services/databaseService"));
const userQueries_1 = require("./schemas/queries/userQueries");
const messagingService_1 = __importDefault(require("./services/messagingService"));
const apiService_1 = __importDefault(require("./services/apiService"));
const mainRouter_1 = __importDefault(require("./routes/mainRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const Settings_json_1 = require("./config/Settings.json");
// init services
databaseService_1.default.start();
messagingService_1.default.start();
const routes = [
    new mainRouter_1.default(),
    new userRouter_1.default(),
    new authRouter_1.default(),
];
// start server
const superShare = new apiService_1.default(Settings_json_1.server, routes);
superShare.startServer();
console.log(JSON.stringify(userQueries_1.userQs));
console.log(typeof (userQueries_1.userQs));
console.log(Object.keys(userQueries_1.userQs));
//# sourceMappingURL=server.js.map