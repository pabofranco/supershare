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
const crypto_1 = require("crypto");
const helpers_1 = require("../helpers");
class AuthController {
    /* Authentication:
    *  user logs in with username and password
    *  user receives auth token to be sent in every request from now on
    *  that token is valid until the user logs out
    */
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // parameters validation
                const { error, message } = helpers_1.validationHelper.validateAuthParams(request.body);
                if (error)
                    throw new Error(message);
                // const { username, password } = request.body;
                const token = (0, crypto_1.randomUUID)();
                return response.status(200).json({ message, token });
            }
            catch (ex) {
                const { message } = ex;
                return response.status(500).json({ error: true, message });
            }
        });
    }
    /* Password Recovery:
    *  user enters e-mail
    *  system creates a recovery token
    *  system sends e-mail with URL to reset password
    *  user access URL and sets new password
    *  system creates new salt for that password
    */
    recovery(_, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return response.status(200).json({ status: 'ok' });
            }
            catch (ex) {
                const { message } = ex;
                return response.status(500).json({ error: true, message });
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.js.map