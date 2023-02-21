"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueries = void 0;
const tables_1 = require("../tables");
const users = tables_1.tables.users;
const salts = tables_1.tables.salts;
const passwords = tables_1.tables.passwords;
exports.userQueries = {
    INSERT: `INSERT INTO ${users} (id, username, email, queue) VALUES (?, ?, ?, ?); INSERT INTO ${salts} (id, salt, user_id) VALUES (?, ?, ?); INSERT INTO ${passwords} (id, password, user_id) VALUES (?, ?, ?);`,
    UPDATE_EMAIL: `UPDATE TABLE ${users} SET email = ? WHERE id = ?`,
    UPDATE_PASSWORD: `UPDATE TABLE ${users} SET password = ? WHERE id = ?; UPDATE TABLE ${salts} SET salt = ? WHERE id = ?`,
    LIST: `SELECT * FROM ${users} ORDER BY id`,
    GET: `SELECT * FROM ${users} WHERE id = ?`,
    DELETE: `DELETE FROM ${users} WHERE id = ? DELETE FROM ${salts} WHERE user_id = ?`,
};
//# sourceMappingURL=userQueries.js.map