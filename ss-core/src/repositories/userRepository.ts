import { format } from "mysql";
import { Iuser } from "../models/Iuser";
import { IqueryResult } from "../interfaces/IqueryResult";
import { Iresult } from "../interfaces/Iresult";
import { userQueries } from "../schemas/queries/userQueries";
import Database from "../services/databaseService";

export const userRepository = {
    insert: async (data: string[]): Promise<Iresult> => {
        return new Promise((resolve) => {
            try {
                const insertQuery = format(userQueries.INSERT, data);
                Database.pool().query(insertQuery, (error) => {
                    if (error) throw new Error(error.message);
                    return resolve({ message: 'User inserted successfully' });
                });
            } catch(ex) {
                const error = ex as Error;
                return resolve({ error: true, message: error.message });
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
                const error = ex as Error;
                return resolve({ error: true, message: error.message });
            }
        });
    },

    list: async (): Promise<IqueryResult<Iuser[]>> => {
        return new Promise((resolve) => {
            try {
                Database.pool().query(userQueries.LIST, (error, rows) => {
                    if (error) throw new Error(error.message);
                    return resolve(rows)
                });
            } catch(ex) {
                const error = ex as Error;
                return resolve({ error: true, data: error.message });
            }
        });
    }
};
