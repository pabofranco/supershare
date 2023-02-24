import { tables } from 'schemas/tables';

const { users, passwords, recovery, salts } = tables;

export const authQueries = {
    GET_USER_DATA: `
    SELECT user.id AS user_id, user_salt.salt, user_password.password AS hashed_password
    FROM users
    INNER JOIN user_salt ON user_salt.user_id = user.id
    INNER JOIN user_password ON user_password.user_id = user.id
    WHERE user.username = ?;
    `
};
