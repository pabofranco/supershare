import { Request, Response } from 'express';
import { validationHelper } from 'helpers';
import { Token } from 'providers';
import { IauthParams, IuserValidation } from 'interfaces';
import { authRepository } from './Auth.repository';

class AuthController {
    /* Authentication:
    *  user logs in with username and password
    *  user receives auth token to be sent in every request from now on
    *  that token is valid until the user logs out
    *
    *   token and user id must be placed at 'authentication' and 'etags' headers, respectively
    */
    async login(request: Request, response: Response): Promise<Response> {
        try {
            // parameters validation
            const validateParams = validationHelper.validateAuthParams(request.body);
            if (validateParams.error) throw new Error(validateParams.message);

            const { username, password } = request.body as IauthParams;

            const validationData = await authRepository.getValidationData(username);
            if (validationData.error) throw new Error(validationData.message);

            const { user_id, salt, hashed_password } = validationData.data as IuserValidation;
            const token = Token.generateToken();

            if (token && authRepository.checkPassword(password, salt, hashed_password)
                && Token.addToken({ id: user_id, token })) {
                const expireDate =  new Date(new Date().getDate() + 30);
                response.cookie('x-user-token', token, { expires: expireDate, httpOnly: true });
                response.cookie('x-user-id', user_id, { expires: expireDate, httpOnly: true });

                return response.status(200).json({ user_id, token });
            }

            throw new Error('Login failed: Invalid password for username provided');
        } catch (ex) {
            const { message } = ex as Error;
            return response.status(500).json({ error: true, message });
        }
    }

    async logout(request: Request, response: Response): Promise<Response> {
        try {
            const userToken = request.cookies('x-user-token');
            const userId = request.cookies('x-user-id');

            if (!userToken) throw new Error('Invalid user token provided.');
            if (!userId) throw new Error('Invalid user id provided.');

            if (Token.removeToken({ id: userId, token: userToken })) {
                response.clearCookie('x-user-token');
                response.clearCookie('x-user-id');
                return response.status(200).json({ message: 'User logged out successfully' });
            }

            throw new Error('Logout failed: Unable to remove token from system.');
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
