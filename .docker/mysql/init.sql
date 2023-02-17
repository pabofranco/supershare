CREATE DATABASE IF NOT EXISTS ttl;

GRANT ALL PRIVILEGES ON ttl.* TO 'admin'@'%' IDENTIFIED BY 'nimda';
GRANT ALL PRIVILEGES ON ttl.* TO 'admin'@'localhost' IDENTIFIED BY 'nimda';

USE ttl;

CREATE TABLE IF NOT EXISTS users (
    id          INTEGER NOT NULL AUTO_INCREMENT,
    email       VARCHAR(100) NOT NULL,
    token       VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS history (
    id          INTEGER NOT NULL AUTO_INCREMENT,
    user_from   VARCHAR(36) NOT NULL,
    user_to     VARCHAR(36) NOT NULL,
    data        TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_from) REFERENCES users(id),
    FOREIGN KEY (user_to)   REFERENCES users(id)
);
