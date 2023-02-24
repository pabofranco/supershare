import { Request, Response } from 'express';
import { validationHelper } from 'helpers';
import { Token } from 'providers';
import { IauthParams, IqueryResult, IuserValidation } from 'interfaces';
import { authRepository } from './Auth.repository';

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

            const { username, password } = request.body as IauthParams;
            // get salt data => get userId, salt, password from username
            // hash password and check
            // if hash checks out, return userId and token
            // token => authentication / userId => etags
            const userData: IqueryResult<IuserValidation> = await authRepository.getValidationData(username);
            if (userData.error) throw new Error(userData.data as string);

            const { user_id, salt, hashed_password } = userData.data as IuserValidation;
            const token = Token.generateToken();
            if (authRepository.checkPassword(password, salt, hashed_password)
                && Token.addToken({ id: user_id, token })) {
                return response.status(200).json({ user_id, token });
            }

            throw new Error('Login failed: Invalid password for username provided');
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
