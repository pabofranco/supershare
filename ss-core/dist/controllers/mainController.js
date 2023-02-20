"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseService_1 = __importDefault(require("../services/databaseService"));
const loggerService_1 = __importDefault(require("../services/loggerService"));
class MainController {
    constructor() {
        this.logger = loggerService_1.default.getInstance();
        this.dbConn = databaseService_1.default.getInstance();
    }
    indexRoute(_, response) {
        return response.status(200).json({ status: 'ok', message: 'online' });
    }
}
exports.default = MainController;
//# sourceMappingURL=mainController.js.map