-- delete if it exist
DROP DATABASE IF EXISTS this_that_db;
-- create new database
CREATE DATABASE this_that_db;

-- code below for testing only, delete on production
USE this_that_db;

DROP TABLE IF EXISTS choice;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS question;

-- CREATE TABLE question (
--     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     this_true VARCHAR(50) NOT NULL,
--     that_false VARCHAR(50) NOT NULL
--     -- created_at DATETIME DEFAULT CURRENT_DATE
-- );

-- CREATE TABLE user (
--     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(30) NOT NULL,
--     password VARCHAR(30) NOT NULL
-- );

 CREATE TABLE choice (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
     question_id INTEGER NOT NULL,
     user_id INTEGER NOT NULL,
     choice BOOLEAN NOT NULL,
     CONSTRAINT fk_q_id FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE,
     CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
 );

