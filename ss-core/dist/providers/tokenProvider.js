"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenProvider {
    constructor() {
        this.validTokens = new Map();
    }
    addToken(data) {
        const { id, token } = data;
        if (this.validTokens.has(token))
            return false;
        this.validTokens.set(token, id);
        return true;
    }
    removeToken(data) {
        const { token } = data;
        if (!this.validTokens.has(token))
            return false;
        this.validTokens.delete(token);
        return true;
    }
    updateToken(data) {
        const { id, token } = data;
        if (!this.validTokens.has(token))
            return false;
        this.validTokens.set(token, id);
        return true;
    }
    clearTokens() {
        this.validTokens.clear();
    }
    validateToken(data) {
        const { id, token } = data;
        if (!this.validTokens.has(token))
            return false;
        return this.validTokens.get(token) === id;
    }
}
exports.default = new TokenProvider();
//# sourceMappingURL=tokenProvider.js.map