import { tables } from '../tables';

const users = tables.users;
const salts = tables.salts;

export const userQueries = {
    INSERT: `INSERT INTO ${users} (id, username, email, password, queue) VALUES (?, ?, ?, ?, ?); INSERT INTO ${salts} (id, salt, user_id) VALUES (?, ?, ?)`,
    UPDATE_EMAIL: `UPDATE TABLE ${users} SET email = ? WHERE id = ?`,
    UPDATE_PASSWORD: `UPDATE TABLE ${users} SET password = ? WHERE id = ?; UPDATE TABLE ${salts} SET salt = ? WHERE id = ?`,
    LIST: `SELECT * FROM ${users} ORDER BY id`,
    GET: `SELECT * FROM ${users} WHERE id = ?`,
    DELETE: `DELETE FROM ${users} WHERE id = ? DELETE FROM ${salts} WHERE user_id = ?`,
};
