SET client_min_messages = 'error';

-- DATABASE TYPES --------------------------------------------------------
DROP TABLE IF EXISTS profile_settings,usertypes,profileType users;

-- USERS 
DROP TABLE IF EXISTS tagwords;


-- DATABASE TYPES --------------------------------------------------------
CREATE TABLE usertypes (-- The types of users could be ADMIN, PARTNER,TRAINER,CUSTOMER
    typeid SERIAL PRIMARY KEY,
    typename VARCHAR(15) NOT NULL,
    typedescription VARCHAR(50) NOT NULL 
);
CREATE TABLE profileType ( -- Public or private
    id SMALLINT PRIMARY KEY NOT NULL,
    thedescription VARCHAR(15) NOT NULL
);
-- USERS        --------------------------------------------------------
CREATE TABLE users ( -- All users that have access to Login
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    userType SMALLINT REFERENCES userTypes(typeID) NOT NULL,
    title VARCHAR(8) NOT NULL ,
    firstName VARCHAR(20)NOT NULL ,
    lastName VARCHAR(30),
    photo TEXT,
    CONSTRAINT validate_email CHECK (email LIKE '%___@___%__%') ,
    hashed_password TEXT NOT NULL
);
