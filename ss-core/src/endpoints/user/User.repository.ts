import { format } from 'mysql';
import { createHash, randomUUID } from 'crypto';
import { userQueries } from './User.queries';
import { Database } from 'services';
import { IqueryResult, Iresult, Iuser, IuserPassword, IuserSalt, IregisterParams } from 'interfaces';

export const createNew = {
    user: (data: IregisterParams): Iuser => {
        const id = randomUUID(); 
        return {
            ... data,
            id,
            queue: `queue-${id}`, 
        };
    },

    salt: (id: string): IuserSalt => {
        return {
            id: randomUUID(),
            salt: randomUUID(),
            user_id: id,
        };
    },

    password: (id: string, password: string, salt: string): IuserPassword => {
        const unhashedPsw = `${password}${salt}`;
        const hasehdPsw = createHash('sha256').update(unhashedPsw).digest('hex');

        return {
            id: randomUUID(),
            password: hasehdPsw,
            user_id: id, 
        };
    }
};

export const userRepository = {
    list: async (): Promise<IqueryResult<Iuser[]>> => {
        return new Promise((resolve) => {
            try {
                Database.pool().query(userQueries.LIST, (error, rows) => {
                    if (error) throw new Error(error.message);
                    return resolve(rows)
                });
            } catch(ex) {
                const { message } = ex as Error;
                return resolve({ error: true, data: message });
            }
        });
    },

    insert: async (data: string[]): Promise<Iresult> => {
        return new Promise((resolve) => {
            try {
                const insertQuery = format(userQueries.INSERT, data);
                Database.pool().query(insertQuery, (error) => {
                    if (error) throw new Error(error.message);
                    return resolve({ message: 'User inserted successfully' });
                });
            } catch(ex) {
                const { message } = ex as Error;
                return resolve({ error: true, message });
            }
        });
    },

    remove: async (id: string): Promise<Iresult> => {
        return new Promise((resolve) => {
            try {
                const removeQuery = format(userQueries.DELETE, [id]);
                Database.pool().query(removeQuery, (error) => {
                    if (error) throw new Error(error.message);
                    return resolve({ message: 'User removed successfully' });
                });
            } catch(ex) {
                const { message } = ex as Error;
                return resolve({ error: true, message });
            }
        });
    },

    updateEmail: async (id: string, email: string): Promise<Iresult> => {
        return new Promise((resolve) => {
            try {
                const updateQuery = format(userQueries.UPDATE_EMAIL, [email, id]);
                Database.pool().query(updateQuery, (error) => {
                    if (error) throw new Error(error.message);

                    return resolve({ message: 'E-mail updated succesfully' });
                });
            } catch(ex) {
                const { message } = ex as Error;
                return resolve({ error: true, message });
            }
        });
    },

    updatePassword: async (id: string, psw: string): Promise<Iresult> => {
        return new Promise((resolve) => {
            try {
                const { salt } = createNew.salt(id);
                const { password } = createNew.password(id, psw, salt);
                const updateQuery = format(userQueries.UPDATE_PASSWORD, [salt, id, password, id]);

                Database.pool().query(updateQuery, (error) => {
                    if (error) throw new Error(error.message);

                    return resolve({ message: 'Password updated successfully' });
                });
            } catch(ex) {
                const { message } = ex as Error;
                return resolve({ error: true, message });
            }
        });
    },

    updateSalt: async(data: IuserSalt): Promise<Iresult> => {
        return new Promise((resolve) => {
            try {
                return resolve({ message: 'Salt updated successfully' });
            } catch(ex) {
                const { message } = ex as Error;
                return resolve({ error: true, message });
            }
        });
    }
};
