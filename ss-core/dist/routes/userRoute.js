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
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validationHelper_1 = require("../helpers/validationHelper");
exports.router = (0, express_1.Router)()
    /*
     * Registration:
     *  user sets username, password and confirmation
     *  system creates a salt for the password
     *  system adds new user with salted psw
    */
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // parameters validation
    const { error, message } = validationHelper_1.validationHelper.validateRegisterParams(req.body);
    if (error)
        return res.status(400).json(message);
    try {
        const userData = req.body;
        const newUser = yield userController_1.userController.addUser(userData);
        if (newUser.error) {
            return res.status(500).json(newUser.data);
        }
        return res.status(200).json(newUser.data);
    }
    catch (ex) {
        return res.status(500).json(ex);
    }
}));
//# sourceMappingURL=userRoute.js.map