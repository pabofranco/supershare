import { IauthParams } from '../interfaces/IauthParams';
import { IregisterParams } from '../interfaces/IregisterParams';
import { IvalidationResult } from '../interfaces/IvalidationResult';

export const validateAuthParams = ({ username, password }: IauthParams): IvalidationResult => {
    let error = false;
    let message = null;

    if (!username) { // add regex validation
        error = true;
        message = 'Invalid e-mail provided';
    }

    if (!password) {
        error = true;
        message = 'Password cannot be empty';
    }

    return { error, message };
};

export const validateRegisterParams = ({ username, email, password, confirmation }: IregisterParams): IvalidationResult => {
        let error = false;
        let message = 'User registration was successful';

        if (!username) {
            error = true;
            message = 'Invalid username provided';
        }

        if (!email) { // add regex validation
            error = true;
            message = 'Invalid e-mail provided';
        }

        if (!password) {
            error = true;
            message = 'Invalid password provided';
        }

        if (!confirmation || password !== confirmation) {
            error = true;
            message = 'Password does not match with confirmation';
        }
        
        return { error, message };
};
