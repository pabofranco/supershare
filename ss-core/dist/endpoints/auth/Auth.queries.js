"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authQueries = void 0;
const tables_1 = require("schemas/tables");
const { users, passwords, salts } = tables_1.tables;
exports.authQueries = {
    GET_USER_DATA: `
    SELECT u.id AS user_id, us.salt, up.password AS hashed_password
    FROM ${users} AS u
    INNER JOIN ${salts} AS us ON us.user_id = u.id
    INNER JOIN ${passwords} AS up ON up.user_id = u.id
    WHERE u.username = ?;
    `
};
//# sourceMappingURL=Auth.queries.js.map