"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authQueries = void 0;
const tables_1 = require("../tables");
const usersTable = tables_1.tables.users;
exports.authQueries = {
    INSERT: `INSERT INTO ${usersTable} (id, username, email, password) VALUES (?, ?, ?, ?)`,
    UPDATE_EMAIL: `UPDATE TABLE ${usersTable} SET email = ? WHERE id = ?`,
    UPDATE_PASSWORD: `UPDATE TABLE ${usersTable} SET password = ? WHERE id = ?`,
    LIST: `SELECT * FROM ${usersTable} ORDER BY id`,
    GET: `SELECT * FROM ${usersTable} WHERE id = ?`,
    DELETE: `DELETE FROM ${usersTable} WHERE id = ?`,
};
//# sourceMappingURL=authQueries.js.map