import { createPool, Pool, format, MysqlError, PoolConnection } from 'mysql';
import { database } from '../config/Settings.json';
import { IqueryResult } from '../interfaces/IqueryResult';

var pool: Pool;

export const dbHelper = {
  init: (): void => {
    if (pool) {
      return;
    }
  
    pool = createPool(database.connection);
  },

  runQuery: (sql: string, args: (string | number)[]): Promise<IqueryResult> => {
    const query = format(sql, args);

    return new Promise((resolve, reject) => {
      pool.getConnection((error: MysqlError, connection: PoolConnection) => {
        if (error) {
          return reject({ error: true, data: error });
        }

        connection.query(query, (error: MysqlError, rows: any) => {
          connection.release();
          if (error) {
            return reject({ error: true, data: error });
          }

          return resolve({ error: false, data: rows });
        });
      });
    });
  },
};
