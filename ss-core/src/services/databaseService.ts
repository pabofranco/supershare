import { createPool, Pool, format, MysqlError, PoolConnection } from 'mysql';
import { IdatabaseConfig } from "../interfaces/IdatabaseConfig";
import LoggerService from './loggerService';


export class DatabaseConnector {
    private logger = LoggerService.getInstance();
    private poolConnection: Pool;

    constructor( config: IdatabaseConfig) {
        this.poolConnection = createPool(config);
    }
    
    public runQuery<T>(sql: string, args: (string | number)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            try {
                const query = format(sql, args);
                this.poolConnection.getConnection((connError: MysqlError, conn: PoolConnection) => {
                    if (connError) {
                        const errorMessage = `Error while connecting to database: ${connError.code}: ${connError.message}`;
                        this.logger.error(errorMessage);
                        return reject(connError);
                    }

                    conn.query(query, (error: MysqlError, result: unknown) => {
                        conn.release();
                        if (error) {
                            const errorMessage = `Error while querying database: ${error.code}: ${error.message}`;
                            this.logger.error(errorMessage);
                            return reject(error);
                        }

                        return resolve(result as T);
                    });
                });
            } catch (ex) {
                this.logger.error(`Error while querying database: ${ex}`);
                return reject(ex);
            }
        });
    }
}


export default class DatabaseService {
    private static _instance: DatabaseConnector;

    public static getInstance(config: IdatabaseConfig | null = null) {
        if (this._instance === null && config) {
            
            this._instance = new DatabaseConnector(config);
        }

        return this._instance;
    }
}
