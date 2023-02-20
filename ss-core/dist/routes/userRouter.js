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
const express_1 = require("express");
const validationHelper_1 = require("../helpers/validationHelper");
const userController_1 = __importDefault(require("../controllers/userController"));
class UserRouter {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.controller = new userController_1.default();
    }
    configureRoutes() {
        this.router.post(this.path, this.insertUser);
    }
    insertUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // parameters validation
            const { error, message } = validationHelper_1.validationHelper.validateRegisterParams(request.body);
            if (error) {
                return response.status(400).json(message);
            }
            try {
                const userData = request.body;
                const newUser = yield this.controller.addUser(userData);
                if (newUser.error) {
                    return response.status(500).json(newUser.data);
                }
                return response.status(200).json(newUser.data);
            }
            catch (ex) {
                return response.status(500).json(ex);
            }
        });
    }
}
exports.default = UserRouter;
//# sourceMappingURL=userRouter.js.map