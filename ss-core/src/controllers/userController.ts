import { randomUUID } from 'crypto';
import { Icontroller } from '../interfaces/Icontroller';
import { IqueryResult } from '../interfaces/IqueryResult';
import { IregisterParams } from '../interfaces/IregisterParams';
import { userQueries } from '../schemas/queries/userQueries';
import DatabaseService, { DatabaseConnector } from '../services/databaseService';
import LoggerService, { Logger } from '../services/loggerService';

class UserController implements Icontroller {
  logger: Logger;
  dbConn: DatabaseConnector;

  constructor() {
    this.logger = LoggerService.getInstance();
    this.dbConn = DatabaseService.getInstance();
  }

  async addUser(data: IregisterParams): Promise<IqueryResult> {
    const userId = randomUUID();
    const userQueue = `queue-${userId}`;

    // create channel for user (rabbitMQ)
    // create queue   for user (rabbitMQ)

    const queryData = [
      userId,
      data.username,
      data.email,
      data.password,
      userQueue,
    ];

    const userResult = await this.dbConn.runQuery(userQueries.INSERT, queryData);

    this.logger.info(JSON.stringify(userResult));

    const userInfo = {
      id: userId,
      queue: userQueue,
      status: 'User added successfully',
    };

    return { error: false, data: [userInfo]};

  }
}

export default UserController;
