"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPool = void 0;
const mysql_1 = require("mysql");
const Settings_json_1 = require("../config/Settings.json");
var pool;
const getPool = () => {
    if (pool) {
        return pool;
    }
    pool = (0, mysql_1.createPool)(Settings_json_1.database.connection);
    return pool;
};
exports.getPool = getPool;
//# sourceMappingURL=dbHelper.js.map