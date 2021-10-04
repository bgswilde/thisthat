-- delete if it exist
DROP DATABASE IF EXISTS this_that_db;
-- create new database
CREATE DATABASE this_that_db;

-- uses database, dropping the tables which will be added at the start of the server through sequelize
USE this_that_db;

DROP TABLE IF EXISTS choice;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS question;


