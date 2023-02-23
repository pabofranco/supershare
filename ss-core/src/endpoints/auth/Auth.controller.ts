import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { validationHelper } from 'helpers';

class AuthController {
    /* Authentication:
    *  user logs in with username and password
    *  user receives auth token to be sent in every request from now on
    *  that token is valid until the user logs out
    */
    async login(request: Request, response: Response): Promise<Response> {
        try {
            // parameters validation
            const { error, message } = validationHelper.validateAuthParams(request.body);
            if (error) throw new Error(message);

            // const { username, password } = request.body;
            const token = randomUUID();
            return response.status(200).json({ message, token });

        } catch (ex) {
            const { message } = ex as Error;
            return response.status(500).json({ error: true, message });
        }
    }

    /* Password Recovery:
    *  user enters e-mail
    *  system creates a recovery token
    *  system sends e-mail with URL to reset password
    *  user access URL and sets new password
    *  system creates new salt for that password
    */
    async recovery(_: Request, response: Response): Promise<Response> {
        try {
            return response.status(200).json({ status: 'ok' });    
        } catch (ex) {
            const { message } = ex as Error;
            return response.status(500).json({ error: true, message });
        }
    }
}

export default new AuthController();
