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
exports.authRepository = void 0;
const helpers_1 = require("helpers");
const services_1 = require("services");
const Auth_queries_1 = require("./Auth.queries");
exports.authRepository = {
    getValidationData: (username) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            try {
                services_1.Database.pool().query(Auth_queries_1.authQueries.GET_USER_DATA, [username], (error, rows) => {
                    if (error)
                        throw new Error(error.message);
                    return resolve({ error: false, data: rows[0] });
                });
            }
            catch (ex) {
                const { message } = ex;
                return resolve({ error: true, message });
            }
        });
    }),
    checkPassword: (password, salt, hash) => {
        return hash === helpers_1.authHelper.hashPassword(password, salt);
    }
};
//# sourceMappingURL=Auth.repository.js.map