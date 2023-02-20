import { createHash, randomUUID } from 'crypto';
import { IdataController } from '../interfaces/IdataController';
import { IqueryResult } from '../interfaces/IqueryResult';
import { IregisterParams } from '../interfaces/IregisterParams';
import { IuserInfo } from '../interfaces/IuserInfo';
import { userQueries } from '../schemas/queries/userQueries';
import Database from '../services/databaseService';
import Logger from '../services/loggerService';
import Messaging from '../services/messagingService';

class UserController implements IdataController<IuserInfo> {
  async insert(payload: unknown): Promise<IqueryResult> {
    const data = payload as IregisterParams;
    try {
      const userId = randomUUID();
      const userQueue = `queue-${userId}`;

      // create user queue
      if (!await Messaging.createQueue(userQueue)) {
        throw new Error('Error creating queue');
      }

      // create salt entry
      const saltId = randomUUID();
      const userSalt = randomUUID();
      const saltedPsw = createHash('sha256')
        .update(`${data.password}${userSalt}`)
        .digest()
        .toString();

      // user payload
      const queryData: string[] = [
        userId,
        data.username,
        data.email,
        saltedPsw,
        userQueue,
        saltId,
        userSalt,
        userId,
      ];

      const insertResult = await Database.runQuery(userQueries.INSERT, queryData);

      Logger.info(JSON.stringify(insertResult));

      // return creted user data
      const userInfo: IuserInfo = {
        id: userId,
        username: data.username,
        email: data.email,
        queue: userQueue,
      };

      return { error: false, data: [userInfo]};
    } catch(ex) {
      const errorMsg = `Error while adding user ${data.username}: ${ex}`;
      Logger.error(errorMsg);
      return { error: true, data: errorMsg };
    }
  }

  async remove(data: IuserInfo): Promise<IqueryResult> {
    const { id } = data;

    try {
      const deleteResult = await Database.runQuery(userQueries.DELETE, [id, id]);

      Logger.info(JSON.stringify(deleteResult));

      return { error: false, data: `User ${id} was removed successfully` };
    } catch(ex) {
      const errorMsg = `Error while removing user ${id}: ${ex}`;
      Logger.error(errorMsg);
      return { error: true, data: errorMsg };
    }
  }

  async update(data: IuserInfo): Promise<IqueryResult> {
    const { password, email } = data;
    const isPasswordUpdate = password && !email;

    if (isPasswordUpdate) {
      return this.updatePassword(data);
    }
    else {
      return this.updateEmail(data);
    }
  }

  async list(): Promise<IqueryResult> {
    try {
      const users = await Database.runQuery(userQueries.LIST) as IuserInfo[];
      Logger.info(JSON.stringify(users));

      return { error: false, data: users };
    } catch(ex) {
      const errorMsg = `Error while getting users: ${ex}`;
      Logger.error(errorMsg);
      return { error: true, data: errorMsg };
    }
  }

  async updateEmail(data: IuserInfo): Promise<IqueryResult> {
    const { id, email } = data;

    if (!email) {
      throw new Error('Invalid e-mail provided');
    }

    try {
      const updateResult = await Database.runQuery(userQueries.UPDATE_EMAIL, [id, email]);

      Logger.info(JSON.stringify(updateResult));

      return { error:false, data: 'E-mail updates successfully' };
    } catch(ex) {
      const errorMsg = `Error while updating e-mail for user ${id}: ${ex}`;
      Logger.error(errorMsg);
      return { error: true, data: errorMsg };
    }
  }

  async updatePassword(data: IuserInfo): Promise<IqueryResult> {
    const { id, password } = data;

    try {
       // create new salt
       const userSalt = randomUUID();
       const saltedPsw = createHash('sha256')
         .update(`${password}${userSalt}`)
         .digest()
         .toString();

      const updatePassword = await Database.runQuery(userQueries.UPDATE_PASSWORD, [saltedPsw, id, userSalt, id]);

      Logger.info(JSON.stringify(updatePassword));

      return { error: false, data: 'Password updated successfully' };
    } catch(ex) {
      const errorMsg = `Error while updating password for user ${id}: ${ex}`;
      Logger.error(errorMsg);
      return { error: true, data: errorMsg };
    }
  }
}

export default UserController;
