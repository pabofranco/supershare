"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const Settings_json_1 = require("../config/Settings.json");
class Database {
    constructor() {
        const options = Object.assign(Object.assign({}, Settings_json_1.database.connection), { multipleStatements: true });
        this.poolConnection = (0, mysql_1.createPool)(options);
    }
    pool() { return this.poolConnection; }
}
exports.default = new Database();
//# sourceMappingURL=Database.service.js.map