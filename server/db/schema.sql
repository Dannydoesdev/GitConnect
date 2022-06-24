SET client_min_messages = 'error';
-- DATABASE TYPES --------------------------------------------------------
CREATE TABLE usertypes (-- The types of users could be Developer, Recruiter, Researcher
    id INT PRIMARY KEY NOT NULL,
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
    githubName TEXT,
    email TEXT UNIQUE,
    userType SMALLINT REFERENCES userTypes(id) NOT NULL,
    profiletype SMALLINT REFERENCES profiletype(id),
    firstName VARCHAR(20),
    lastName VARCHAR(30),
    photo TEXT,
    aboutmetitle TEXT,
    aboutme TEXT,
    mobile VARCHAR(16),
    portfoliolink TEXT,
    githubutrl TEXT,
    gitHubAvatar TEXT,
    gitHubrepos_url TEXT,
    gitHubFullName TEXT,
    gitHubCompany TEXT,
    gitHubBlog TEXT,
    gitHubTwitter TEXT,
    gitHubHirable TEXT,
    gitHubLocation TEXT,
    gitHubBio TEXT,
    gitHubMemberSince TEXT,
    coverPhoto TEXT,
    CONSTRAINT validate_email CHECK (email LIKE '%___@___%__%')
);
CREATE TABLE hashed_passwords ( -- Separate table to store only hashed passwords and user ids. Security reasons
    id SMALLINT REFERENCES users(id),
    hashed_password TEXT NOT NULL
);
CREATE TABLE socialmedialinks ( -- Each users social media links kept here
    id SMALLINT REFERENCES users(id),
    socialmediatype SMALLINT REFERENCES socialmediaTypes(id),
    link TEXT NOT NULL 
);
CREATE TABLE userlanguages ( -- Users programming languages  
    userID SMALLINT REFERENCES users(id) NOT NULL,
    languageID SMALLINT REFERENCES programmingLanguages(id) NOT NULL
);
CREATE TABLE messages ( -- messages left for users
    id SERIAL PRIMARY KEY,
    msgfrom SMALLINT REFERENCES users(id) NOT NULL,
    msgtooID SMALLINT REFERENCES users(id) NOT NULL,
    datereceived DATE NOT NULL,
    timereceived TIME NOT NULL,
    themsg TEXT NOT NULL,
    timetoexpire DATE,
    msgread BIT NOT NULL
);
-- REPOS..
CREATE TABLE repoparameters ( -- Repos and their paramaters. 
    repoID TEXT PRIMARY KEY UNIQUE NOT NULL, -- eg math.random
    gitHubRepoName TEXT, -- namr of repo (not user)
    userID SMALLINT REFERENCES users(id),
    status BIT NOT NULL, -- Available for viewing Y or N
    projectName TEXT, -- gitconnect project name
    description TEXT, -- other stuff should be gitconnect NOT github
    process TEXT,
    challenges TEXT,
    outcomes TEXT,
    tags TEXT,
    titleimage TEXT,
    projectImageUrl TEXT,
    githuburl TEXT,
    collaborators_url TEXT,
    issue_events_url TEXT,
    branches_url TEXT,
    tags_url TEXT,
    languages_url TEXT,
    contributors_url TEXT,
    subscribers_url TEXT,
    commits_url TEXT,
    created_at TEXT,
    updated_at TEXT,
    license TEXT,
    langone TEXT,
    langtwo TEXT,
    langthree TEXT,
    langfour TEXT,
    htmlurl TEXT,
    isfork BIT, --true/false for if it is a fork
    stargazers_count INT, -- number of stargazers
    watchers_count INT, -- number of watchers
    subscribers_count INT, -- number of subscribers
    youtubeurl TEXT,
    app_link TEXT
);
