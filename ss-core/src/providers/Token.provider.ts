import { randomUUID } from 'crypto';
import { Itoken } from 'interfaces';
import { Logger } from 'providers';

class Token {
    private validTokens: Map<string, string>;

    constructor() {
        this.validTokens = new Map<string, string>();
    }

    generateToken(): string {
        return randomUUID();
    }

    addToken(data: Itoken): boolean {
        const { id, token } = data;

        if (this.validTokens.has(id)) return false;

        this.validTokens.set(id, token);
        Logger.info(`Token added: ${token} assigned to id ${id}`);
        return true;
    }

    removeToken(data: Itoken): boolean {
        const { id } = data;
        if (!this.validTokens.has(id)) return false;

        this.validTokens.delete(id);
        return true;
    }

    updateToken(data: Itoken): boolean {
        const { id, token } = data;
        if (!this.validTokens.has(id)) return false;

        this.validTokens.set(id, token);
        return true;
    }

    clearTokens(): void {
        this.validTokens.clear();
    }

    validateToken(data: Itoken): boolean {
        const { id, token } = data;
        Logger.info(`Checking Token: ${token} for id ${id}`);
        if (!this.validTokens.has(id)) return false;

        return this.validTokens.get(id) === token;
    }

    getUserToken(id: string): string | null{
        return this.validTokens.get(id) || null;
    }
}

export default new Token();