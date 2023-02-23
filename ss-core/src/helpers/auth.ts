import { NextFunction, Request, Response } from 'express';
import { TokenProvider } from '../providers';

export const authHelper = {
    authenticateRequest: (request: Request, response: Response, next: NextFunction) => {
        const { authorization, etag } = request.headers;
        try {
            if (!authorization || authorization === 'null')
                throw new Error('Invalid token provided');

            if (!etag || etag === 'null')
                throw new Error('Invalid id provided');

            if (!TokenProvider.validateToken({ id: etag, token: authorization }))
                throw new Error('Unauthorized');

            next();
        } catch(ex) {
            const { message } = ex as Error;
            return response.status(400).json({ error: true, message });
        }
    },
};
