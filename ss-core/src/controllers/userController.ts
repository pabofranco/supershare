import { Request, Response } from 'express';
import { createHash, randomUUID } from 'crypto';
import { validationHelper } from '../helpers/validationHelper';
import { IdataController } from '../interfaces/IdataController';
import { IqueryResult } from '../interfaces/IqueryResult';
import { IregisterParams } from '../interfaces/IregisterParams';
import { IuserInfo } from '../interfaces/IuserInfo';
import { userQueries } from '../schemas/queries/userQueries';
import Database from '../services/databaseService';
import Logger from '../services/loggerService';
import Messaging from '../services/messagingService';

class UserController implements IdataController {
  name: string;

  constructor() {
    this.name = 'UserController';
  }

  async insert(req: Request, res: Response): Promise<Response> {
    try {
      // parameters validation
      const { error, message } = validationHelper.validateRegisterParams(req.body);
      if (error) {
        throw new Error(message);
      } 

      const data = req.body as IregisterParams;
      const userId = randomUUID();
      const userQueue = `queue-${userId}`;

      // create user queue
      if (!await Messaging.createQueue(userQueue)) {
        throw new Error('Error creating queue');
      }

      // create salt entry
      const userSalt = randomUUID();
      const pswData = `${data.password}${userSalt}`;
      const saltedPsw = createHash('sha256').update(pswData).digest('hex');

      // user payload
      const queryData: string[] = [
        userId,
        data.username,
        data.email,
        userQueue,
        randomUUID(), // salt entry
        userSalt,
        userId,
        randomUUID(), // psw entry
        saltedPsw,
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

      return res.status(200).json({ error: false, data: [userInfo] });
    } catch(ex) {
      const errorMsg = `Error while adding user: ${ex}`;
      Logger.error(errorMsg);
      return res.status(500).json({ error: true, data: errorMsg });
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('Invalid Id provided');
      }

      const deleteResult = await Database.runQuery(userQueries.DELETE, [id, id]);

      Logger.info(JSON.stringify(deleteResult));

      return res.status(200).json({ error: false, data: `User ${id} was removed successfully` });
    } catch(ex) {
      const errorMsg = `Error while removing user: ${ex}`;
      Logger.error(errorMsg);
      return res.status(500).json({ error: true, data: errorMsg });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { password, email } = req.body;
      const isPasswordUpdate = password && !email;

      if (isPasswordUpdate) {
        const { error, data } = await this.updatePassword(req.body);
        if (error) {
          throw new Error(data?.toString());
        }

        return res.status(200).json({ error: false, data });
      } else {
        const { error, data } = await this.updateEmail(req.body);
        if (error) {
          throw new Error(data?.toString());
        }

        return res.status(200).json({ error: false, data });
      }
    } catch(ex) {
      const errorMsg = `Error while updating user: ${ex}`;
      Logger.error(errorMsg);
      return res.status(500).json({ error: true, data: errorMsg});
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      const users = await Database.runQuery(userQueries.LIST) as IuserInfo[];
      Logger.info(JSON.stringify(users));

      return res.status(200).json({ error: false, data: users });
    } catch(ex) {
      const errorMsg = `Error while getting users: ${ex}`;
      Logger.error(errorMsg);
      return res.status(500).json({ error: true, data: errorMsg });
    }
  }

  private async updateEmail(data: IuserInfo): Promise<IqueryResult> {
    const { id, email } = data;

    if (!email) {
      throw new Error('Invalid e-mail provided');
    }

    try {
      await Database.runQuery(userQueries.UPDATE_EMAIL, [id, email]);
      return { error: false, data: 'E-mail updated successfully' };
    } catch(ex) {
      const errorMsg = `Error while updating e-mail for user ${id}: ${ex}`;
      Logger.error(errorMsg);
      return { error: true, data: errorMsg };
    }
  }

  private async updatePassword(data: IuserInfo): Promise<IqueryResult> {
    const { id, password } = data;

    try {
       // create new salt
       const userSalt = randomUUID();
       const saltedPsw = createHash('sha256')
         .update(`${password}${userSalt}`)
         .digest()
         .toString();

      await Database.runQuery(userQueries.UPDATE_PASSWORD, [saltedPsw, id, userSalt, id]);

      return { error: false, data: 'Password updated successfully' };
    } catch(ex) {
      const errorMsg = `Error while updating password for user ${id}: ${ex}`;
      Logger.error(errorMsg);
      return { error: true, data: errorMsg };
    }
  }
}

export default UserController;
