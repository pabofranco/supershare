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
const messagingService_1 = __importDefault(require("../services/messagingService"));
class UserController {
    insert(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = payload;
            try {
                const userId = (0, crypto_1.randomUUID)();
                const userQueue = `queue-${userId}`;
                // create user queue
                if (!(yield messagingService_1.default.createQueue(userQueue))) {
                    throw new Error('Error creating queue');
                }
                // create salt entry
                const saltId = (0, crypto_1.randomUUID)();
                const userSalt = (0, crypto_1.randomUUID)();
                const saltedPsw = (0, crypto_1.createHash)('sha256')
                    .update(`${data.password}${userSalt}`)
                    .digest()
                    .toString();
                // user payload
                const queryData = [
                    userId,
                    data.username,
                    data.email,
                    saltedPsw,
                    userQueue,
                    saltId,
                    userSalt,
                    userId,
                ];
                const insertResult = yield databaseService_1.default.runQuery(userQueries_1.userQueries.INSERT, queryData);
                loggerService_1.default.info(JSON.stringify(insertResult));
                // return creted user data
                const userInfo = {
                    id: userId,
                    username: data.username,
                    email: data.email,
                    queue: userQueue,
                };
                return { error: false, data: [userInfo] };
            }
            catch (ex) {
                const errorMsg = `Error while adding user ${data.username}: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return { error: true, data: errorMsg };
            }
        });
    }
    remove(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = data;
            try {
                const deleteResult = yield databaseService_1.default.runQuery(userQueries_1.userQueries.DELETE, [id, id]);
                loggerService_1.default.info(JSON.stringify(deleteResult));
                return { error: false, data: `User ${id} was removed successfully` };
            }
            catch (ex) {
                const errorMsg = `Error while removing user ${id}: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return { error: true, data: errorMsg };
            }
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, email } = data;
            const isPasswordUpdate = password && !email;
            if (isPasswordUpdate) {
                return this.updatePassword(data);
            }
            else {
                return this.updateEmail(data);
            }
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield databaseService_1.default.runQuery(userQueries_1.userQueries.LIST);
                loggerService_1.default.info(JSON.stringify(users));
                return { error: false, data: users };
            }
            catch (ex) {
                const errorMsg = `Error while getting users: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return { error: true, data: errorMsg };
            }
        });
    }
    updateEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email } = data;
            if (!email) {
                throw new Error('Invalid e-mail provided');
            }
            try {
                const updateResult = yield databaseService_1.default.runQuery(userQueries_1.userQueries.UPDATE_EMAIL, [id, email]);
                loggerService_1.default.info(JSON.stringify(updateResult));
                return { error: false, data: 'E-mail updates successfully' };
            }
            catch (ex) {
                const errorMsg = `Error while updating e-mail for user ${id}: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return { error: true, data: errorMsg };
            }
        });
    }
    updatePassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, password } = data;
            try {
                // create new salt
                const userSalt = (0, crypto_1.randomUUID)();
                const saltedPsw = (0, crypto_1.createHash)('sha256')
                    .update(`${password}${userSalt}`)
                    .digest()
                    .toString();
                const updatePassword = yield databaseService_1.default.runQuery(userQueries_1.userQueries.UPDATE_PASSWORD, [saltedPsw, id, userSalt, id]);
                loggerService_1.default.info(JSON.stringify(updatePassword));
                return { error: false, data: 'Password updated successfully' };
            }
            catch (ex) {
                const errorMsg = `Error while updating password for user ${id}: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return { error: true, data: errorMsg };
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map