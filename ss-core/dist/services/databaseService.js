"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const Settings_json_1 = require("../config/Settings.json");
const loggerService_1 = __importDefault(require("./loggerService"));
class Database {
    constructor() {
        this.poolConnection = null;
    }
    start() {
        if (!this.poolConnection) {
            this.poolConnection = (0, mysql_1.createPool)(Settings_json_1.database.connection);
        }
    }
    runQuery(sql, args = []) {
        return new Promise((resolve, reject) => {
            var _a;
            try {
                const query = (0, mysql_1.format)(sql, args);
                (_a = this.poolConnection) === null || _a === void 0 ? void 0 : _a.getConnection((connError, conn) => {
                    if (connError) {
                        const errorMessage = `Error while connecting to database: ${connError.code}: ${connError.message}`;
                        loggerService_1.default.error(errorMessage);
                        return reject(connError);
                    }
                    conn.query(query, (error, result) => {
                        conn.release();
                        if (error) {
                            const errorMessage = `Error while querying database: ${error.code}: ${error.message}`;
                            loggerService_1.default.error(errorMessage);
                            return reject(error);
                        }
                        return resolve(result);
                    });
                });
            }
            catch (ex) {
                loggerService_1.default.error(`Error while querying database: ${ex}`);
                return reject(ex);
            }
        });
    }
}
exports.default = new Database();
//# sourceMappingURL=databaseService.js.map