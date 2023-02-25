import { tables } from 'schemas/tables';

const { users, passwords, salts } = tables;

export const authQueries = {
    GET_USER_DATA: `
    SELECT u.id AS user_id, us.salt, up.password AS hashed_password
    FROM ${users} AS u
    INNER JOIN ${salts} AS us ON us.user_id = u.id
    INNER JOIN ${passwords} AS up ON up.user_id = u.id
    WHERE u.username = ?;
    `
};
