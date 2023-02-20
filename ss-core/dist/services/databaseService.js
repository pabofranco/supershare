"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnector = void 0;
const mysql_1 = require("mysql");
const loggerService_1 = __importDefault(require("./loggerService"));
class DatabaseConnector {
    constructor(config) {
        this.logger = loggerService_1.default.getInstance();
        this.poolConnection = (0, mysql_1.createPool)(config);
    }
    runQuery(sql, args) {
        return new Promise((resolve, reject) => {
            try {
                const query = (0, mysql_1.format)(sql, args);
                this.poolConnection.getConnection((connError, conn) => {
                    if (connError) {
                        const errorMessage = `Error while connecting to database: ${connError.code}: ${connError.message}`;
                        this.logger.error(errorMessage);
                        return reject(connError);
                    }
                    conn.query(query, (error, result) => {
                        conn.release();
                        if (error) {
                            const errorMessage = `Error while querying database: ${error.code}: ${error.message}`;
                            this.logger.error(errorMessage);
                            return reject(error);
                        }
                        return resolve(result);
                    });
                });
            }
            catch (ex) {
                this.logger.error(`Error while querying database: ${ex}`);
                return reject(ex);
            }
        });
    }
}
exports.DatabaseConnector = DatabaseConnector;
class DatabaseService {
    static getInstance(config = null) {
        if (this._instance === null && config) {
            this._instance = new DatabaseConnector(config);
        }
        return this._instance;
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=databaseService.js.map