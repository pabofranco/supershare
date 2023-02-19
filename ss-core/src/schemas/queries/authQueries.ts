import { tables } from '../tables';

const usersTable = tables.users;

export const authQueries = {
    INSERT:             `INSERT INTO ${usersTable} (id, username, email, password) VALUES (?, ?, ?, ?)`,
    UPDATE_EMAIL:       `UPDATE TABLE ${usersTable} SET email = ? WHERE id = ?`,
    UPDATE_PASSWORD:    `UPDATE TABLE ${usersTable} SET password = ? WHERE id = ?`,
    LIST:               `SELECT * FROM ${usersTable} ORDER BY id`,
    GET:                `SELECT * FROM ${usersTable} WHERE id = ?`,
    DELETE:             `DELETE FROM ${usersTable} WHERE id = ?`,
};
