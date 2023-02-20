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
exports.router = void 0;
const crypto_1 = require("crypto");
const express_1 = require("express");
const validationHelper_1 = require("../helpers/validationHelper");
exports.router = (0, express_1.Router)()
    /* Auth Process
     * Authentication:
     *  user logs in with username and password
     *  user receives auth token to be sent in every request from now on
     *  that token is valid until the user logs out
     *
     * Password Recovery:
     *  user enters e-mail
     *  system creates a recovery token
     *  system sends e-mail with URL to reset password
     *  user access URL and sets new password
     *  system creates new salt for that password
     *
    */
    .post('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // parameters validation
    const { error, message } = validationHelper_1.validationHelper.validateAuthParams(req.body);
    if (error)
        return res.status(400).json(message);
    try {
        const { username, password } = req.body;
        const token = (0, crypto_1.randomUUID)();
        return res.status(200).json({ message, token });
    }
    catch (ex) {
        return res.status(500).json(ex);
    }
}))
    .post('/recovery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ status: 'ok' });
}));
//# sourceMappingURL=authRoute.js.map