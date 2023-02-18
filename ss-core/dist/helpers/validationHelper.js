"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterParams = exports.validateAuthParams = void 0;
const validateAuthParams = ({ username, password }) => {
    let error = false;
    let message = null;
    if (!username) { // add regex validation
        error = true;
        message = 'Invalid e-mail provided';
    }
    if (!password) {
        error = true;
        message = 'Password cannot be empty';
    }
    return { error, message };
};
exports.validateAuthParams = validateAuthParams;
const validateRegisterParams = ({ username, email, password, confirmation }) => {
    let error = false;
    let message = 'User registration was successful';
    if (!username) {
        error = true;
        message = 'Invalid username provided';
    }
    if (!email) { // add regex validation
        error = true;
        message = 'Invalid e-mail provided';
    }
    if (!password) {
        error = true;
        message = 'Invalid password provided';
    }
    if (!confirmation || password !== confirmation) {
        error = true;
        message = 'Password does not match with confirmation';
    }
    return { error, message };
};
exports.validateRegisterParams = validateRegisterParams;
//# sourceMappingURL=validationHelper.js.map