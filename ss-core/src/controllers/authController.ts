import { randomUUID } from 'crypto';
import { dbHelper } from '../helpers/dbHelper';
import { IqueryResult } from '../interfaces/IqueryResult';
import { IregisterParams } from '../interfaces/IregisterParams';
import { authQueries } from '../schemas/queries/authQueries';
import { logger } from '../helpers/logger';

export const authController = {
  addUser: async (data: IregisterParams): Promise<IqueryResult> => {
    const queryData = [
      randomUUID(),
      data.username,
      data.email,
      data.password,
    ];

    const userResult = await dbHelper.runQuery(authQueries.INSERT, queryData);
    logger.info(JSON.stringify(userResult));
    return { error: false, data: [] };
    // .then((result: unknown) => {
    //     return { error: false, message: result };
    //   })
    //   .catch((error: unknown) => {
    //     return { error: true, message: error };
    //   });
  }
};
