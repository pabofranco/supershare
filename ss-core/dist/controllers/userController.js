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
const validationHelper_1 = require("../helpers/validationHelper");
const loggerService_1 = __importDefault(require("../services/loggerService"));
const userRepository_1 = require("../repositories/userRepository");
class UserController {
    list(_, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userRepository_1.userRepository.list();
                if (users.error)
                    throw new Error((_a = users.data) === null || _a === void 0 ? void 0 : _a.toString());
                loggerService_1.default.info(JSON.stringify(users));
                return res.status(200).json(users);
            }
            catch (ex) {
                const errorMsg = `Error while getting users: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return res.status(500).json({ error: true, data: errorMsg });
            }
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // parameters validation
                const { error, message } = validationHelper_1.validationHelper.validateRegisterParams(req.body);
                if (error)
                    throw new Error(message);
                const { email, password, username } = req.body;
                const userData = userRepository_1.createNew.user(req.body);
                const saltData = userRepository_1.createNew.salt(userData.id);
                const pswData = userRepository_1.createNew.password(userData.id, password, saltData.salt);
                const queryData = [
                    userData.id, username, email, userData.queue,
                    saltData.id, saltData.salt, saltData.user_id,
                    pswData.id, pswData.password, pswData.user_id, // password
                ];
                const newUser = yield userRepository_1.userRepository.insert(queryData);
                if (newUser.error)
                    throw new Error(newUser.message);
                loggerService_1.default.info(newUser.message);
                // // create user queue
                // if (!await Messaging.createQueue(userData.queue)) {
                //   throw new Error('Error creating queue');
                // }
                return res.status(200).json({ error: false, data: userData });
            }
            catch (ex) {
                const errorMsg = `Error while adding user: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return res.status(500).json({ error: true, data: errorMsg });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, password, email } = req.body;
                const isPasswordUpdate = password && !email;
                if (isPasswordUpdate) {
                    const { error, message } = yield userRepository_1.userRepository.updatePassword(id, password);
                    if (error)
                        throw new Error(message);
                    return res.status(200).json({ error: false, data: message });
                }
                else {
                    const { error, message } = yield userRepository_1.userRepository.updateEmail(id, email);
                    if (error)
                        throw new Error(message);
                    return res.status(200).json({ error: false, message });
                }
            }
            catch (ex) {
                const errorMsg = `Error while updating user: ${ex}`;
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
                const removedUser = yield userRepository_1.userRepository.remove(id);
                if (removedUser.error)
                    throw new Error(removedUser.message);
                loggerService_1.default.info(JSON.stringify(removedUser.message));
                return res.status(200).json({ error: false, data: removedUser.message });
            }
            catch (ex) {
                const errorMsg = `Error while removing user: ${ex}`;
                loggerService_1.default.error(errorMsg);
                return res.status(500).json({ error: true, data: errorMsg });
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map