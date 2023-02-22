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
const validationHelper_1 = require("../helpers/validationHelper");
const databaseService_1 = __importDefault(require("../services/databaseService"));
const loggerService_1 = __importDefault(require("../services/loggerService"));
const messagingService_1 = __importDefault(require("../services/messagingService"));
const userQueries_1 = require("../schemas/queries/userQueries");
class UserController {
    constructor() {
        this.name = 'UserController';
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // parameters validation
                const { error, message } = validationHelper_1.validationHelper.validateRegisterParams(req.body);
                if (error) {
                    throw new Error(message);
                }
                const data = req.body;
                const userId = (0, crypto_1.randomUUID)();
                const userQueue = `queue-${userId}`;
                // create user queue
                if (!(yield messagingService_1.default.createQueue(userQueue))) {
                    throw new Error('Error creating queue');
                }
                // create salt entry
                const userSalt = (0, crypto_1.randomUUID)();
                const pswData = `${data.password}${userSalt}`;
                const saltedPsw = (0, crypto_1.createHash)('sha256').update(pswData).digest('hex');
                // user payload
                const queryData = [
                    userId,
                    data.username,
                    data.email,
                    userQueue,
                    (0, crypto_1.randomUUID)(),
                    userSalt,
                    userId,
                    (0, crypto_1.randomUUID)(),
                    saltedPsw,
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
                return res.status(200).json({ error: false, data: [userInfo] });
            }
            catch (ex) {
                const errorMsg = `Error while adding user: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return res.status(500).json({ error: true, data: errorMsg });
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    throw new Error('Invalid Id provided');
                }
                const deleteResult = yield databaseService_1.default.runQuery(userQueries_1.userQueries.DELETE, [id, id]);
                loggerService_1.default.info(JSON.stringify(deleteResult));
                return res.status(200).json({ error: false, data: `User ${id} was removed successfully` });
            }
            catch (ex) {
                const errorMsg = `Error while removing user: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return res.status(500).json({ error: true, data: errorMsg });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email } = req.body;
                const isPasswordUpdate = password && !email;
                if (isPasswordUpdate) {
                    const { error, data } = yield this.updatePassword(req.body);
                    if (error) {
                        throw new Error(data === null || data === void 0 ? void 0 : data.toString());
                    }
                    return res.status(200).json({ error: false, data });
                }
                else {
                    const { error, data } = yield this.updateEmail(req.body);
                    if (error) {
                        throw new Error(data === null || data === void 0 ? void 0 : data.toString());
                    }
                    return res.status(200).json({ error: false, data });
                }
            }
            catch (ex) {
                const errorMsg = `Error while updating user: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return res.status(500).json({ error: true, data: errorMsg });
            }
        });
    }
    list(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield databaseService_1.default.runQuery(userQueries_1.userQueries.LIST);
                loggerService_1.default.info(JSON.stringify(users));
                return res.status(200).json({ error: false, data: users });
            }
            catch (ex) {
                const errorMsg = `Error while getting users: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return res.status(500).json({ error: true, data: errorMsg });
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
                yield databaseService_1.default.runQuery(userQueries_1.userQueries.UPDATE_EMAIL, [id, email]);
                return { error: false, data: 'E-mail updated successfully' };
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
                yield databaseService_1.default.runQuery(userQueries_1.userQueries.UPDATE_PASSWORD, [saltedPsw, id, userSalt, id]);
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