import { randomUUID } from 'crypto';
import { Router, Request, Response } from 'express';
import { validationHelper } from '../helpers/validationHelper';
import { authController } from '../controllers/authController';
import { IregisterParams } from '../interfaces/IregisterParams';

const router = Router();

/* Auth Process
 *  
 * Registration:
 *  user sets username, password and confirmation
 *  system creates a salt for the password
 *  system adds new user with salted psw
 * 
 * Authentication:
 *  user logs in with username and password
 *  user receives auth token to be sent in every request from now on
 *  that token is valid until the user logs out
 *
 * Password Recovery:
 *  user enters e-mail
 *  system creates a recovery token
 *  system sends e-mail with URL to reset password
 *  user access URL and sets new password
 *  system creates new salt for that password
 * 
*/

router.post('/auth', async (req: Request, res: Response): Promise<Response> => {
    // parameters validation
    const { error, message } = validationHelper.validateAuthParams(req.body);
    if (error) return res.status(400).json(message);

    try {
        const { username, password } = req.body;
        const token = randomUUID();
        return res.status(200).json({ message, token });

    } catch (ex) {
        return res.status(500).json(ex);
    }
});

router.post('/register', async (req: Request, res: Response): Promise<Response> => {
    // parameters validation
    const { error, message } = validationHelper.validateRegisterParams(req.body);
    if (error) return res.status(400).json(message);

    try {
        const userData = req.body as IregisterParams;
        const newUser = await authController.addUser(userData);

        if (newUser.error) {
            return res.status(500).json(newUser.data);
        }

        return res.status(200).json(newUser.data);
    } catch (ex) {
        return res.status(500).json(ex);
    }
});

router.post('/recovery', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ status: 'ok' });
});


module.exports = router;
