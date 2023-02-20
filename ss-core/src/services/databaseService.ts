import { createPool, Pool, format, MysqlError, PoolConnection } from 'mysql';
import { database } from "../config/Settings.json";
import Logger from './loggerService';

class Database {
    private poolConnection: Pool | null;

    constructor() {
        this.poolConnection = null;
    } 

    start() {
        if (!this.poolConnection) {
            this.poolConnection = createPool(database.connection);
        }
    }

    public runQuery<T>(sql: string, args: (string | number)[] = []): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            try {
                const query = format(sql, args);
                this.poolConnection?.getConnection((connError: MysqlError, conn: PoolConnection) => {
                    if (connError) {
                        const errorMessage = `Error while connecting to database: ${connError.code}: ${connError.message}`;
                        Logger.error(errorMessage);
                        return reject(connError);
                    }

                    conn.query(query, (error: MysqlError, result: unknown) => {
                        conn.release();
                        if (error) {
                            const errorMessage = `Error while querying database: ${error.code}: ${error.message}`;
                            Logger.error(errorMessage);
                            return reject(error);
                        }

                        return resolve(result as T);
                    });
                });
            } catch (ex) {
                Logger.error(`Error while querying database: ${ex}`);
                return reject(ex);
            }
        });
    }
}

export default new Database();
