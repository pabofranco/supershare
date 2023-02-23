import { tables } from 'schemas/tables';

const users = tables.users;
const salts = tables.salts;
const passwords = tables.passwords;

export const userQueries = {
    INSERT: `
    START TRANSACTION;
    INSERT INTO ${users} (id, username, email, queue) VALUES (?, ?, ?, ?);
    INSERT INTO ${salts} (id, salt, user_id) VALUES (?, ?, ?);
    INSERT INTO ${passwords} (id, password, user_id) VALUES (?, ?, ?);
    COMMIT;
    `,

    UPDATE_EMAIL: `UPDATE TABLE ${users} SET email = ? WHERE id = ?`,

    UPDATE_PASSWORD: `
    START TRANSACTION;
    UPDATE TABLE ${salts} SET salt = ? WHERE user_id = ?;
    UPDATE TABLE ${users} SET password = ? WHERE user_id = ?;
    COMMIT;
    `,

    LIST: `SELECT * FROM ${users} ORDER BY id`,

    GET: `SELECT * FROM ${users} WHERE id = ?`,

    DELETE: `
    START TRANSACTION;
    DELETE FROM ${salts} WHERE user_id = ?;
    DELETE FROM ${passwords} WHERE user_id = ?;
    DELETE FROM ${users} WHERE id = ?;
    COMMIT;
    `,
};
