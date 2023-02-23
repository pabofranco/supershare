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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.createNew = void 0;
const mysql_1 = require("mysql");
const crypto_1 = require("crypto");
const User_queries_1 = require("./User.queries");
const services_1 = require("services");
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
                services_1.Database.pool().query(User_queries_1.userQueries.LIST, (error, rows) => {
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
                const insertQuery = (0, mysql_1.format)(User_queries_1.userQueries.INSERT, data);
                services_1.Database.pool().query(insertQuery, (error) => {
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
                const removeQuery = (0, mysql_1.format)(User_queries_1.userQueries.DELETE, [id]);
                services_1.Database.pool().query(removeQuery, (error) => {
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
                const updateQuery = (0, mysql_1.format)(User_queries_1.userQueries.UPDATE_EMAIL, [email, id]);
                services_1.Database.pool().query(updateQuery, (error) => {
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
    updatePassword: (id, psw) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            try {
                const { salt } = exports.createNew.salt(id);
                const { password } = exports.createNew.password(id, psw, salt);
                const updateQuery = (0, mysql_1.format)(User_queries_1.userQueries.UPDATE_PASSWORD, [salt, id, password, id]);
                services_1.Database.pool().query(updateQuery, (error) => {
                    if (error)
                        throw new Error(error.message);
                    return resolve({ message: 'Password updated successfully' });
                });
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
//# sourceMappingURL=User.repository.js.map