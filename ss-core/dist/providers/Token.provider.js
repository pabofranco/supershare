"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const providers_1 = require("providers");
class Token {
    constructor() {
        this.validTokens = new Map();
    }
    generateToken() {
        return (0, crypto_1.randomUUID)();
    }
    addToken(data) {
        const { id, token } = data;
        if (this.validTokens.has(id))
            return false;
        this.validTokens.set(id, token);
        providers_1.Logger.info(`Token added: ${token} assigned to id ${id}`);
        return true;
    }
    removeToken(data) {
        const { id } = data;
        if (!this.validTokens.has(id))
            return false;
        this.validTokens.delete(id);
        return true;
    }
    updateToken(data) {
        const { id, token } = data;
        if (!this.validTokens.has(id))
            return false;
        this.validTokens.set(id, token);
        return true;
    }
    clearTokens() {
        this.validTokens.clear();
    }
    validateToken(data) {
        const { id, token } = data;
        providers_1.Logger.info(`Checking Token: ${token} for id ${id}`);
        if (!this.validTokens.has(id))
            return false;
        return this.validTokens.get(id) === token;
    }
    getUserToken(id) {
        return this.validTokens.get(id) || null;
    }
}
exports.default = new Token();
//# sourceMappingURL=Token.provider.js.map