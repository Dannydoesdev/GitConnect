-- INITIALISE THE DUMMY DATA ONLY
-- COMMENT OUT WHAT EVER IS NOT REQUIRED TO BE INITIALISED
-- Keep all data except what is dropped in this table.
SET client_min_messages = 'error';

-- REPO INFO
DROP TABLE IF EXISTS repoParamaters;

-- USER INFO
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS userlanguages;
DROP TABLE IF EXISTS socialmedialinks;
DROP TABLE IF EXISTS hashed_passwords;
DROP TABLE IF EXISTS users;
