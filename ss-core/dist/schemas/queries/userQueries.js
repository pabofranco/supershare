"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueries = void 0;
const tables_1 = require("../tables");
const usersTable = tables_1.tables.users;
exports.userQueries = {
    INSERT: `INSERT INTO ${usersTable} (id, username, email, password, queue) VALUES (?, ?, ?, ?, ?)`,
    UPDATE_EMAIL: `UPDATE TABLE ${usersTable} SET email = ? WHERE id = ?`,
    UPDATE_PASSWORD: `UPDATE TABLE ${usersTable} SET password = ? WHERE id = ?`,
    LIST: `SELECT * FROM ${usersTable} ORDER BY id`,
    GET: `SELECT * FROM ${usersTable} WHERE id = ?`,
    DELETE: `DELETE FROM ${usersTable} WHERE id = ?`,
};
//# sourceMappingURL=userQueries.js.map