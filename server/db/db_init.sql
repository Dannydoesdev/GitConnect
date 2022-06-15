-- INITIALISE THE WHOLE DATABASE
-- Will remove all data and tables and start from teh very beginning
SET client_min_messages = 'error';

-- REPOS
DROP TABLE IF EXISTS repoParamaters;

-- USERS 
DROP TABLE IF EXISTS messages,userlanguages,socialmedialinks,hashed_passwords,users;

-- DATABASE TYPES --------------------------------------------------------
DROP TABLE IF EXISTS programmingLanguages,socialmediaTypes,profiletype,usertypes;

