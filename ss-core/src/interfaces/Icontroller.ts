import DatabaseService from "../services/databaseService";
import LoggerService from "../services/loggerService";

export interface Icontroller {
    logger: LoggerService;
    dbConn: DatabaseService;
}