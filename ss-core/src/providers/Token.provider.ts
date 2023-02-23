import { Itoken } from 'interfaces';

class Token {
    private validTokens: Map<string, string>;

    constructor() {
        this.validTokens = new Map<string, string>();
    }

    addToken(data: Itoken): boolean {
        const { id, token } = data;

        if (this.validTokens.has(token)) return false;

        this.validTokens.set(token, id);
        return true;
    }

    removeToken(data: Itoken): boolean {
        const { token } = data;
        if (!this.validTokens.has(token)) return false;

        this.validTokens.delete(token);
        return true;
    }

    updateToken(data: Itoken): boolean {
        const { id, token } = data;
        if (!this.validTokens.has(token)) return false;

        this.validTokens.set(token, id);
        return true;
    }

    clearTokens(): void {
        this.validTokens.clear();
    }

    validateToken(data: Itoken): boolean {
        const { id,token } = data;
        if (!this.validTokens.has(token)) return false;

        return this.validTokens.get(token) === id;
    }
}

export default new Token();