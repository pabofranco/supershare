"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueries = void 0;
const tables_1 = require("schemas/tables");
const { users, salts, passwords } = tables_1.tables;
exports.userQueries = {
    LIST: `SELECT * FROM ${users} ORDER BY id`,
    GET: `SELECT * FROM ${users} WHERE id = ?`,
    UPDATE_EMAIL: `UPDATE TABLE ${users} SET email = ? WHERE id = ?`,
    INSERT: `
    START TRANSACTION;
    INSERT INTO ${users} (id, username, email, queue) VALUES (?, ?, ?, ?);
    INSERT INTO ${salts} (id, salt, user_id) VALUES (?, ?, ?);
    INSERT INTO ${passwords} (id, password, user_id) VALUES (?, ?, ?);
    COMMIT;
    `,
    UPDATE_PASSWORD: `
    START TRANSACTION;
    UPDATE TABLE ${salts} SET salt = ? WHERE user_id = ?;
    UPDATE TABLE ${users} SET password = ? WHERE user_id = ?;
    COMMIT;
    `,
    DELETE: `
    START TRANSACTION;
    DELETE FROM ${salts} WHERE user_id = ?;
    DELETE FROM ${passwords} WHERE user_id = ?;
    DELETE FROM ${users} WHERE id = ?;
    COMMIT;
    `,
};
//# sourceMappingURL=User.queries.js.map