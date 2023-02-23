"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHelper = void 0;
exports.validationHelper = {
    validateAuthParams: ({ username, password }) => {
        let error = false;
        let message = '';
        if (!username) { // add regex validation
            error = true;
            message = 'Invalid e-mail provided';
        }
        if (!password) {
            error = true;
            message = 'Password cannot be empty';
        }
        return { error, message };
    },
    validateRegisterParams: ({ username, email, password, confirmation }) => {
        let error = false;
        let message = '';
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
    },
    validateQueueMessage: ({ id, queue, data }) => {
        let error = false;
        let message = '';
        if (!id) {
            error = true;
            message = 'Invalid id provided';
        }
        if (!queue) {
            error = true;
            message = 'Invalid queue provided';
        }
        if (!data) {
            error = true;
            message = 'Invalid data provided';
        }
        return { error, message };
    }
};
//# sourceMappingURL=validationHelper.js.map