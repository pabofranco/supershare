"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseService_1 = __importDefault(require("./services/databaseService"));
const loggerService_1 = __importDefault(require("./services/loggerService"));
const apiService_1 = __importDefault(require("./services/apiService"));
const mainRouter_1 = __importDefault(require("./routes/mainRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const Settings_json_1 = require("./config/Settings.json");
// init helpers
databaseService_1.default.getInstance(Settings_json_1.database.connection);
loggerService_1.default.getInstance();
const controllers = [
    new mainRouter_1.default(),
    new userRouter_1.default(),
    new authRouter_1.default(),
];
// start server
const superShare = new apiService_1.default(Settings_json_1.server, controllers);
superShare.startServer();
//# sourceMappingURL=server.js.map