import { Request, Response } from 'express';
import { validationHelper } from '../helpers/validationHelper';
import { generateUUID, generateSalt, generatePassword } from '../helpers/cryptoHelper';
import { IdataController } from '../interfaces/IdataController';
import { IqueryResult } from '../interfaces/IqueryResult';
import { IregisterParams } from '../interfaces/IregisterParams';
import { IuserInfo } from '../interfaces/IuserInfo';
import Logger from '../services/loggerService';
import Messaging from '../services/messagingService';
import { Iresult } from '../interfaces/Iresult';
import { userRepository } from '../repositories/userRepository';
import { Iuser } from '../models/Iuser';
import { IuserSalt } from '../models/IuserSalt';
import { IuserPassword } from '../models/IuserPassword';

class UserController implements IdataController {
  name: string;

  constructor() { this.name = 'UserController'; }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      const users: IqueryResult<Iuser[]> = await userRepository.list();
      if (users.error) throw new Error(users.data?.toString());

      Logger.info(JSON.stringify(users));

      return res.status(200).json(users);
    } catch(ex) {
      const errorMsg = `Error while getting users: ${ex}`;
      Logger.error(errorMsg);
      return res.status(500).json({ error: true, data: errorMsg });
    }
  }

  async insert(req: Request, res: Response): Promise<Response> {
    try {
      // parameters validation
      const { error, message } = validationHelper.validateRegisterParams(req.body);
      if (error) throw new Error(message);

      const { email, password, username } = req.body as IregisterParams;
      const userId = generateUUID();

      const userData: Iuser = {
        id: userId,
        username,
        email,
        queue: `queue-${userId}`,
      };

      const saltData: IuserSalt = generateSalt(userId);
      const pswData: IuserPassword = generatePassword(userId, password, saltData.salt);

      const queryData: string[] = [
        userId, username, email, userData.queue,        // user
        saltData.id, saltData.salt, saltData.user_id,   // salt
        pswData.id, pswData.password, pswData.user_id,  // password
      ];

      const newUser: Iresult = await userRepository.insert(queryData);

      if (newUser.error) throw new Error(newUser.message);
      Logger.info(newUser.message);

      // create user queue
      if (!await Messaging.createQueue(userData.queue)) {
        throw new Error('Error creating queue');
      }

      return res.status(200).json({ error: false, data: userId });
    } catch(ex) {
      const errorMsg = `Error while adding user: ${ex}`;
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

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('Invalid Id provided');
      }

      const removedUser: Iresult = await userRepository.remove(id);
      if (removedUser.error) throw new Error(removedUser.message);

      Logger.info(JSON.stringify(removedUser.message));

      return res.status(200).json({ error: false, data: removedUser.message });
    } catch(ex) {
      const errorMsg = `Error while removing user: ${ex}`;
      Logger.error(errorMsg);
      return res.status(500).json({ error: true, data: errorMsg });
    }
  }


 

  private async updateEmail(data: IuserInfo): Promise<IqueryResult> {
    return { error: false, data: 'E-mail updated successfully' };
    // const { id, email } = data;

    // if (!email) {
    //   throw new Error('Invalid e-mail provided');
    // }

    // try {
    //   await Database.runQuery(userQueries.UPDATE_EMAIL, [id, email]);
    //   return { error: false, data: 'E-mail updated successfully' };
    // } catch(ex) {
    //   const errorMsg = `Error while updating e-mail for user ${id}: ${ex}`;
    //   Logger.error(errorMsg);
    //   return { error: true, data: errorMsg };
    // }
  }

  private async updatePassword(data: IuserInfo): Promise<IqueryResult> {
    return { error: false, data: 'Password updated successfully' };

  //   const { id, password } = data;
  //   try {
  //     if (!id || !password) throw new Error('Invalid data provided.');

      
  //     // create new salt
  //      const userSalt = generateUUID();
  //      const saltedPsw = saltPassword(userSalt, password);

  //     await Database.runQuery(userQueries.UPDATE_PASSWORD, [saltedPsw, id, userSalt, id]);

  //     return { error: false, data: 'Password updated successfully' };
  //   } catch(ex) {
  //     const errorMsg = `Error while updating password for user ${id}: ${ex}`;
  //     Logger.error(errorMsg);
  //     return { error: true, data: errorMsg };
  //   }
  }
}

export default UserController;
