"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRequest = void 0;
const tokenProvider_1 = __importDefault(require("../providers/tokenProvider"));
const authenticateRequest = (request, response, next) => {
    const { authorization, etag } = request.headers;
    try {
        if (!authorization || authorization === 'null')
            throw new Error('Invalid token provided');
        if (!etag || etag === 'null')
            throw new Error('Invalid id provided');
        if (!tokenProvider_1.default.validateToken({ id: etag, token: authorization }))
            throw new Error('Unauthorized');
        next();
    }
    catch (ex) {
        const { message } = ex;
        return response.status(400).json({ error: true, message });
    }
};
exports.authenticateRequest = authenticateRequest;
//# sourceMappingURL=authHelper.js.map