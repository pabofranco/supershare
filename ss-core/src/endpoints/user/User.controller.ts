import { Request, Response } from 'express';
import { validationHelper, authHelper } from 'helpers';
import { Logger } from 'providers';
import { userRepository } from './User.repository';
import { IregisterParams, IqueryResult, Iresult, Iuser, IuserSalt, IuserPassword } from 'interfaces';

class UserController {
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

      const userData = userRepository.newUser(req.body);
      const saltData: IuserSalt = authHelper.newSalt(userData.id);
      const pswData: IuserPassword = authHelper.newPassword(userData.id, password, saltData.salt);

      const queryData: string[] = [
        userData.id, username, email, userData.queue,   // user
        saltData.id, saltData.salt, saltData.user_id,   // salt
        pswData.id, pswData.password, pswData.user_id,  // password
      ];

      const newUser: Iresult = await userRepository.insert(queryData);
      if (newUser.error) throw new Error(newUser.message);

      return res.status(200).json({ error: false, data: userData });
    } catch(ex) {
      const errorMsg = `Error while adding user: ${ex}`;
      Logger.error(errorMsg);
      return res.status(500).json({ error: true, data: errorMsg });
    }
  }
  
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id, password, email } = req.body;
      const isPasswordUpdate = password && !email;

      if (isPasswordUpdate) {
        const { error, message } = await userRepository.updatePassword(id, password);
        if (error) throw new Error(message);

        return res.status(200).json({ error: false, data: message });
      } else {
        const { error, message } = await userRepository.updateEmail(id, email);
        if (error) throw new Error(message);

        return res.status(200).json({ error: false, message });
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
}

export default new UserController();
