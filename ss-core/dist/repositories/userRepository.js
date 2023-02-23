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
exports.userRepository = exports.createNew = void 0;
const mysql_1 = require("mysql");
const userQueries_1 = require("../schemas/queries/userQueries");
const databaseService_1 = __importDefault(require("../services/databaseService"));
const crypto_1 = require("crypto");
exports.createNew = {
    user: (data) => {
        const id = (0, crypto_1.randomUUID)();
        return Object.assign(Object.assign({}, data), { id, queue: `queue-${id}` });
    },
    salt: (id) => {
        return {
            id: (0, crypto_1.randomUUID)(),
            salt: (0, crypto_1.randomUUID)(),
            user_id: id,
        };
    },
    password: (id, password, salt) => {
        const unhashedPsw = `${password}${salt}`;
        const hasehdPsw = (0, crypto_1.createHash)('sha256').update(unhashedPsw).digest('hex');
        return {
            id: (0, crypto_1.randomUUID)(),
            password: hasehdPsw,
            user_id: id,
        };
    }
};
exports.userRepository = {
    list: () => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            try {
                databaseService_1.default.pool().query(userQueries_1.userQueries.LIST, (error, rows) => {
                    if (error)
                        throw new Error(error.message);
                    return resolve(rows);
                });
            }
            catch (ex) {
                const { message } = ex;
                return resolve({ error: true, data: message });
            }
        });
    }),
    insert: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            try {
                const insertQuery = (0, mysql_1.format)(userQueries_1.userQueries.INSERT, data);
                databaseService_1.default.pool().query(insertQuery, (error) => {
                    if (error)
                        throw new Error(error.message);
                    return resolve({ message: 'User inserted successfully' });
                });
            }
            catch (ex) {
                const { message } = ex;
                return resolve({ error: true, message });
            }
        });
    }),
    remove: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            try {
                const removeQuery = (0, mysql_1.format)(userQueries_1.userQueries.DELETE, [id]);
                databaseService_1.default.pool().query(removeQuery, (error) => {
                    if (error)
                        throw new Error(error.message);
                    return resolve({ message: 'User removed successfully' });
                });
            }
            catch (ex) {
                const { message } = ex;
                return resolve({ error: true, message });
            }
        });
    }),
    updateEmail: (id, email) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            try {
                const updateQuery = (0, mysql_1.format)(userQueries_1.userQueries.UPDATE_EMAIL, [email, id]);
                databaseService_1.default.pool().query(updateQuery, (error) => {
                    if (error)
                        throw new Error(error.message);
                    return resolve({ message: 'E-mail updated succesfully' });
                });
            }
            catch (ex) {
                const { message } = ex;
                return resolve({ error: true, message });
            }
        });
    }),
    updatePassword: (id, password) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            try {
                return resolve({ message: 'Password updated successfully' });
            }
            catch (ex) {
                const { message } = ex;
                return resolve({ error: true, message });
            }
        });
    }),
    updateSalt: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            try {
                return resolve({ message: 'Salt updated successfully' });
            }
            catch (ex) {
                const { message } = ex;
                return resolve({ error: true, message });
            }
        });
    })
};
//# sourceMappingURL=userRepository.js.map