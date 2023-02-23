"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHelper = void 0;
const providers_1 = require("providers");
exports.authHelper = {
    authenticateRequest: (request, response, next) => {
        const { authorization, etag } = request.headers;
        try {
            if (!authorization || authorization === 'null')
                throw new Error('Invalid token provided');
            if (!etag || etag === 'null')
                throw new Error('Invalid id provided');
            if (!providers_1.Token.validateToken({ id: etag, token: authorization }))
                throw new Error('Unauthorized');
            next();
        }
        catch (ex) {
            const { message } = ex;
            return response.status(400).json({ error: true, message });
        }
    },
};
//# sourceMappingURL=Auth.helper.js.map