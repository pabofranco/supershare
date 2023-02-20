import { IauthParams } from '../interfaces/IauthParams';
import { IregisterParams } from '../interfaces/IregisterParams';
import { Iresult } from '../interfaces/Iresult';

export const validationHelper = {
    validateAuthParams: ({ username, password }: IauthParams): Iresult => {
        let error = false;
        let message = undefined;

        if (!username) { // add regex validation
            error = true;
            message = 'Invalid e-mail provided';
        }

        if (!password) {
            error = true;
            message = 'Password cannot be empty';
        }

        return { error, message };
    },

    validateRegisterParams: ({ username, email, password, confirmation }: IregisterParams): Iresult => {
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
    },
};
