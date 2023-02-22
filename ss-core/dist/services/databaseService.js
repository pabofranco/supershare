"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueries = void 0;
const mysql_1 = require("mysql");
const Settings_json_1 = require("../config/Settings.json");
const loggerService_1 = __importDefault(require("./loggerService"));
const users = __importStar(require("../schemas/queries/userQueries"));
class Database {
    constructor() {
        this.poolConnection = null;
    }
    start() {
        if (!this.poolConnection) {
            const options = Object.assign(Object.assign({}, Settings_json_1.database.connection), { multipleStatements: true });
            this.poolConnection = (0, mysql_1.createPool)(options);
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
exports.userQueries = users.queries;
exports.default = new Database();
//# sourceMappingURL=databaseService.js.map