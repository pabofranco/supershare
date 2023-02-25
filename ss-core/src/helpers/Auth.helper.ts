import { createHash, randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { IuserPassword, IuserSalt } from 'interfaces';
import { Token } from 'providers';
import { Logger } from 'providers';

const hashPassword = (password: string, salt: string): string => {
    const unhashedPsw = `${password}${salt}`;
    return createHash('sha256').update(unhashedPsw).digest('hex');
};

export const authHelper = {
    authenticateRequest: (error: Error, request: Request, response: Response, next: NextFunction) => {
        Logger.info(`\n\nRequest headers: ${JSON.stringify(request.headers)}\n\n`);
        const { user_id, user_token } = request.headers;
        try {
            if (!user_token) throw new Error('Invalid token provided');
            if (!user_id) throw new Error('Invalid id provided');
            if (!Token.validateToken({ id: user_id as string, token: user_token as string })) throw new Error('Unauthorized');

            next('router');
        } catch(ex) {
            const { message } = ex as Error;
            Logger.error(message);
            return response.status(400).json({ error: true, message });
        }
    },

    newSalt: (id: string): IuserSalt => {
        return {
            id: randomUUID(),
            salt: randomUUID(),
            user_id: id,
        };
    },

    newPassword: (id: string, password: string, salt: string): IuserPassword => {
        return {
            id: randomUUID(),
            password: hashPassword(password, salt),
            user_id: id,
        };
    },

    hashPassword: (password: string, salt: string): string => {
        return hashPassword(password, salt);
    }
};
