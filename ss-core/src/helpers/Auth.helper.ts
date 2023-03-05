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
    authenticateRequest: (request: Request, response: Response, next: NextFunction) => {
        const userToken = request.cookies('x-user-token');
        const userId = request.cookies('x-user-id');

        try {
            if (!userToken) throw new Error('Invalid token provided');
            if (!userId) throw new Error('Invalid id provided');
            if (!Token.validateToken({ id: userId, token: userToken })) throw new Error('Unauthorized');

            next();
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
