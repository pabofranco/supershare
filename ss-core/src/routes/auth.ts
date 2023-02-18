import { randomUUID } from 'crypto';
import { Router, Request, Response } from 'express';
import { validateAuthParams, validateRegisterParams } from '../helpers/validationHelper';

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
    const { error, message } = validateAuthParams(req.body);
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
    const { error, message } = validateRegisterParams(req.body);
    if (error) return res.status(400).json(message);

    try {
        const { username, email, password, confirmation } = req.body;
        return res.status(200).json(message);
    } catch (ex) {
        return res.status(500).json(ex);
    }
});


module.exports = router;
