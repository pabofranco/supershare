import { authHelper } from 'helpers';
import { IuserValidation, IqueryResult } from 'interfaces';
import { Database } from 'services';
import { authQueries } from './Auth.queries';

export const authRepository = {
    getValidationData: async (username: string): Promise<IqueryResult<IuserValidation>> => {
        return new Promise((resolve) => {
            try {
                Database.pool().query(authQueries.GET_USER_DATA, [username], (error, row) => {
                    if (error) throw new Error(error.message);
                    return resolve({ data: row as IuserValidation });
                });
            } catch (ex) {
                const { message } = ex as Error;
                return resolve({ error: true, data: message });
            }
        });
    },

    checkPassword: (user_password: string, user_salt: string, hashed_password: string): boolean => {
        return hashed_password === authHelper.hashPassword(user_password, user_salt);
    }
};
