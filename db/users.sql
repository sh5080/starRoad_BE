CREATE TABLE IF NOT EXISTS user (
    id INT UNSIGNED AUTO_INCREMENT,
    user_id VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CHECK (CHAR_LENGTH(user_id) BETWEEN 6 AND 20)
);
