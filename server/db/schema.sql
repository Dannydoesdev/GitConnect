-- DATABASE TYPES --------------------------------------------------------
CREATE TABLE usertypes (-- The types of users could be Developer, Recruiter, Researcher
    id SERIAL PRIMARY KEY,
    typename VARCHAR(30) NOT NULL,
    typedescription VARCHAR(100) NOT NULL 
);
CREATE TABLE profiletype ( -- Public or private
    id SMALLINT PRIMARY KEY NOT NULL,
    thedescription VARCHAR(30) NOT NULL
);
CREATE TABLE socialmediatypes (  -- All the social media link types available 
    id SERIAL PRIMARY KEY,
    mediatype VARCHAR(30) NOT NULL,
    homepage TEXT
);
CREATE TABLE programminglanguages ( -- List of potential programming languages
    id SERIAL PRIMARY KEY,
    languagename VARCHAR(50) NOT NULL
);
-- USERS        --------------------------------------------------------
CREATE TABLE users ( -- All users that have access to Login
    id SERIAL PRIMARY KEY,
    githubID VARCHAR(20) NOT NULL,
    email TEXT UNIQUE,
    userType SMALLINT REFERENCES userTypes(id) NOT NULL,
    profiletype SMALLINT REFERENCES profiletype(id),
    firstName VARCHAR(20)NOT NULL ,
    lastName VARCHAR(30),
    photo TEXT,
    aboutmetitle TEXT,
    aboutme TEXT,
    mobile VARCHAR(16),
    CONSTRAINT validate_email CHECK (email LIKE '%___@___%__%')
);
CREATE TABLE hashed_passwords ( -- Separate table to store only hashed passwords and user ids. Security reasons
    id SMALLINT REFERENCES users(id),
    hashed_password TEXT NOT NULL
);
CREATE TABLE socialmedialinks ( -- Each users social media links kept here
    id SMALLINT NOT NULL,
    socialmediatype SMALLINT REFERENCES socialmediaTypes(id),
    link TEXT NOT NULL 
);
CREATE TABLE userlanguages ( -- Users programming languages  
    userID SMALLINT REFERENCES users(id) NOT NULL,
    languageID SMALLINT REFERENCES programmingLanguages(id) NOT NULL
);

-- REPOS..
CREATE TABLE repoParamaters ( -- Repos and their paramaters. 
    repoID TEXT PRIMARY KEY UNIQUE NOT NULL,
    userID SMALLINT REFERENCES users(id),
    status BIT NOT NULL, -- Available for viewing Y or N
    description TEXT,
    story TEXT,
    tags TEXT,
    titleimage TEXT
);
