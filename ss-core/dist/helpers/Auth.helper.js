"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHelper = void 0;
const crypto_1 = require("crypto");
const providers_1 = require("providers");
const providers_2 = require("providers");
const hashPassword = (password, salt) => {
    const unhashedPsw = `${password}${salt}`;
    return (0, crypto_1.createHash)('sha256').update(unhashedPsw).digest('hex');
};
exports.authHelper = {
    authenticateRequest: (error, request, response, next) => {
        providers_2.Logger.info(`\n\nRequest headers: ${JSON.stringify(request.headers)}\n\n`);
        const { user_id, user_token } = request.headers;
        try {
            if (!user_token)
                throw new Error('Invalid token provided');
            if (!user_id)
                throw new Error('Invalid id provided');
            if (!providers_1.Token.validateToken({ id: user_id, token: user_token }))
                throw new Error('Unauthorized');
            next('router');
        }
        catch (ex) {
            const { message } = ex;
            providers_2.Logger.error(message);
            return response.status(400).json({ error: true, message });
        }
    },
    newSalt: (id) => {
        return {
            id: (0, crypto_1.randomUUID)(),
            salt: (0, crypto_1.randomUUID)(),
            user_id: id,
        };
    },
    newPassword: (id, password, salt) => {
        return {
            id: (0, crypto_1.randomUUID)(),
            password: hashPassword(password, salt),
            user_id: id,
        };
    },
    hashPassword: (password, salt) => {
        return hashPassword(password, salt);
    }
};
//# sourceMappingURL=Auth.helper.js.map