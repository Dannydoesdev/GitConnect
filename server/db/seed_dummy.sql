-- This file contains the data for testing while developing the socialmediaTypes
-- Once the site is fully functional, this file can be excluded from any database initialisation.


-- USERS
INSERT INTO users (githubName,email,userType,profiletype,firstName,lastName,photo,aboutmetitle,aboutme,mobile,portfoliolink)
VALUES ('CJunk','jsharman@hotmail.com.au',1,1,'Jericho','Sharman','https://avatars.githubusercontent.com/u/8306841?v=4','Full Stack Software Developer','yadda yadda More stuff goes here','0478816306','www.jerichosharman.com.au');
INSERT INTO users (githubName,email,userType,profiletype,firstName,lastName,photo,aboutmetitle,aboutme,mobile,portfoliolink) 
VALUES(50442868,'daniel.t.mcgee@gmail.com',1,1,'Danny','','https://avatars.githubusercontent.com/u/50442868?v=4','DEVELOPER','More about me stuff','04123423456','');
INSERT INTO users (githubName,email,userType,profiletype,firstName,lastName,photo,aboutmetitle,aboutme,mobile,portfoliolink) 
VALUES('misakigrim','garmonweng@gmail.com',1,1,'Garmon','','https://avatars.githubusercontent.com/u/99120813?v=4','Dev Boy','Hi, I''m me!','0410900900','');


INSERT INTO hashed_passwords (id,hashed_password) VALUES (1,'$2b$10$1lzng8qKwE83WoshE/EHPu2E15DO/BMtZOUyVH1VnVtQLGGFv7paC');

INSERT INTO repoparameters (repoID, gitHubRepoName, userID, status, projectName, description)
VALUES (330517540, 'splootcode', 2, B'1', 'Sploot Code', 'An experimental coding interface that''s tree-based.');
INSERT INTO repoparameters (repoID, gitHubRepoName, userID, status, projectName, description)
VALUES (9791118, 'learn-cryptography', 2, B'1', 'Learn Cryptography', 'This is an AppEngine app for learning basic crytography through analysing and decrypting a series of texts.');