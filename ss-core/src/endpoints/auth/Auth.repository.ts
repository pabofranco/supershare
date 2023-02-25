import { authHelper } from 'helpers';
import { IuserValidation } from 'interfaces';
import { Iquery } from 'interfaces/Iquery';
import { Database } from 'services';
import { authQueries } from './Auth.queries';

export const authRepository = {
    getValidationData: async (username: string): Promise<Iquery<IuserValidation>> => {
        return new Promise((resolve) => {
            try {
                Database.pool().query(authQueries.GET_USER_DATA, [username], (error, rows) => {
                    if (error) throw new Error(error.message);

                    return resolve({ error: false, data: rows[0] });
                });
            } catch (ex) {
                const { message } = ex as Error;
                return resolve({ error: true, message });
            }
        });
    },

    checkPassword: (password: string, salt: string, hash: string): boolean => {
        return hash === authHelper.hashPassword(password, salt);
    }
};
