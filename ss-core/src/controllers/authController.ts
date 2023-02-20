import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { Icontroller } from "../interfaces/Icontroller";
import DatabaseService, { DatabaseConnector } from "../services/databaseService";
import LoggerService, { Logger } from "../services/loggerService";
import { validationHelper } from "../helpers/validationHelper";

class AuthController implements Icontroller {
    logger: Logger;
    dbConn: DatabaseConnector;

    constructor() {
        this.logger = LoggerService.getInstance();
        this.dbConn = DatabaseService.getInstance();
    }

    /* Authentication:
    *  user logs in with username and password
    *  user receives auth token to be sent in every request from now on
    *  that token is valid until the user logs out
    */
    async login(request: Request, response: Response): Promise<Response> {
        // parameters validation
        const { error, message } = validationHelper.validateAuthParams(request.body);
        if (error) return response.status(400).json(message);

        try {
            const { username, password } = request.body;
            const token = randomUUID();
            return response.status(200).json({ message, token });

        } catch (ex) {
            return response.status(500).json(ex);
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
        return response.status(200).json({ status: 'ok' });
    }
}

export default AuthController;
