CREATE DATABASE IF NOT EXISTS supershare;

CREATE USER 'admin'@'%' IDENTIFIED BY 'nimda';
GRANT ALL PRIVILEGES ON ttl.* TO 'admin'@'%' IDENTIFIED BY 'nimda';
GRANT ALL PRIVILEGES ON ttl.* TO 'admin'@'localhost' IDENTIFIED BY 'nimda';
FLUSH PRIVILEGES;

USE supershare;

CREATE TABLE IF NOT EXISTS user_queues (
    `id`          VARCHAR(36) NOT NULL,
    `queue`       VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
);

CREATE TABLE IF NOT EXISTS users (
    `id`          VARCHAR(36)  NOT NULL,
    `email`       VARCHAR(100) NOT NULL,
    `username`    VARCHAR(100) NOT NULL,
    `password`    VARCHAR(255) NOT NULL,
    `queue`       VARCHAR(36)  NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`queue`) REFERENCES user_queues(`id`),
);

CREATE TABLE IF NOT EXISTS user_salt (
    `id`          VARCHAR(36) NOT NULL,
    `salt`        VARCHAR(36) NOT NULL,
    `user_id`     VARCHAR(36) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);

CREATE TABLE IF NOT EXISTS history (
    `id`          VARCHAR(36) NOT NULL,
    `user_from`   VARCHAR(36) NOT NULL,
    `user_to`     VARCHAR(36) NOT NULL,
    `user_data`   TEXT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_from`) REFERENCES users(`id`),
    FOREIGN KEY (`user_to`)   REFERENCES users(`id`)
);

CREATE TABLE IF NOT EXISTS recovery_token (
    `id`          VARCHAR(36) NOT NULL,
    `token`       VARCHAR(36) NOT NULL,
    `valid`       BOOLEAN     NOT NULL DEFAULT 1,
    `user_id`     VARCHAR(36) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);


