-- DATABASE TYPES --------------------------------------------------------
CREATE TABLE usertypes (-- The types of users could be ADMIN, PARTNER,TRAINER,CUSTOMER
    id SERIAL PRIMARY KEY,
    typename VARCHAR(15) NOT NULL,
    typedescription VARCHAR(50) NOT NULL 
);
CREATE TABLE profiletype ( -- Public or private
    id SMALLINT PRIMARY KEY NOT NULL,
    thedescription VARCHAR(15) NOT NULL
);
CREATE TABLE socialmediaTypes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    homepage TEXT
);
CREATE TABLE programmingLanguages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
-- USERS        --------------------------------------------------------
CREATE TABLE users ( -- All users that have access to Login
    id SERIAL PRIMARY KEY,
    githubID VARCHAR(20) NOT NULL,
    email TEXT UNIQUE,
    userType SMALLINT REFERENCES userTypes(id) NOT NULL,
    profiletype SMALLINT REFERENCES profiletype(id),
    -- title VARCHAR(8) NOT NULL , Not sure if required
    firstName VARCHAR(20)NOT NULL ,
    lastName VARCHAR(30),
    photo TEXT,
    aboutmetitle TEXT,
    aboutme TEXT,
    mobile VARCHAR(16),
    CONSTRAINT validate_email CHECK (email LIKE '%___@___%__%')
);
CREATE TABLE hashed_passwords (
    id SMALLINT REFERENCES users(id),
    hashed_password TEXT NOT NULL
);
CREATE TABLE socialmedialinks (
    id SMALLINT NOT NULL,
    socialmediatype SMALLINT REFERENCES socialmediaTypes(id),
    link TEXT NOT NULL 
);
CREATE TABLE userlanguages (
    userID SMALLINT REFERENCES users(id) NOT NULL,
    languageID SMALLINT REFERENCES programmingLanguages(id) NOT NULL
);

-- REPOS..
CREATE TABLE repoParamaters (
    repoID TEXT PRIMARY KEY UNIQUE NOT NULL,
    userID SMALLINT REFERENCES users(id),
    status BIT,
    description TEXT,
    story TEXT,
    tags TEXT
);
