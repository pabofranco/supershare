import { Request, Response } from 'express';
import { Icontroller } from '../interfaces/Icontroller';
import DatabaseService, { DatabaseConnector } from '../services/databaseService';
import LoggerService, { Logger } from '../services/loggerService';

class MainController implements Icontroller {
    logger: Logger;
    dbConn: DatabaseConnector;

    constructor() {
        this.logger = LoggerService.getInstance();
        this.dbConn = DatabaseService.getInstance();
    }
    
    indexRoute(_: Request, response: Response): Response {
        return response.status(200).json({ status: 'ok', message: 'online' });
    }
}

export default MainController;
