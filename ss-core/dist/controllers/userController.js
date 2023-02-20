"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const userQueries_1 = require("../schemas/queries/userQueries");
const databaseService_1 = __importDefault(require("../services/databaseService"));
const loggerService_1 = __importDefault(require("../services/loggerService"));
class UserController {
    constructor() {
        this.logger = loggerService_1.default.getInstance();
        this.dbConn = databaseService_1.default.getInstance();
    }
    addUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (0, crypto_1.randomUUID)();
            const userQueue = `queue-${userId}`;
            // create channel for user (rabbitMQ)
            // create queue   for user (rabbitMQ)
            const queryData = [
                userId,
                data.username,
                data.email,
                data.password,
                userQueue,
            ];
            const userResult = yield this.dbConn.runQuery(userQueries_1.userQueries.INSERT, queryData);
            this.logger.info(JSON.stringify(userResult));
            const userInfo = {
                id: userId,
                queue: userQueue,
                status: 'User added successfully',
            };
            return { error: false, data: [userInfo] };
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map