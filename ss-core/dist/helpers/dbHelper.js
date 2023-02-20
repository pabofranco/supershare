"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbHelper = void 0;
const mysql_1 = require("mysql");
const Settings_json_1 = require("../config/Settings.json");
var pool;
exports.dbHelper = {
    init: () => {
        if (pool) {
            return;
        }
        pool = (0, mysql_1.createPool)(Settings_json_1.database.connection);
    },
    runQuery: (sql, args) => {
        const query = (0, mysql_1.format)(sql, args);
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    return reject({ error: true, data: error });
                }
                connection.query(query, (error, rows) => {
                    connection.release();
                    if (error) {
                        return reject({ error: true, data: error });
                    }
                    return resolve({ error: false, data: rows });
                });
            });
        });
    },
};
//# sourceMappingURL=dbHelper.js.map