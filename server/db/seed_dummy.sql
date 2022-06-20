-- This file contains the data for testing while developing the socialmediaTypes
-- Once the site is fully functional, this file can be excluded from any database initialisation.


-- USERS
INSERT INTO users (githubName,email,userType,profiletype,firstName,lastName,photo,aboutmetitle,aboutme,mobile,portfoliolink)
VALUES ('CJunk','jsharman@hotmail.com.au',1,1,'Jericho','Sharman','https://avatars.githubusercontent.com/u/8306841?v=4','Full Stack Software Developer','yadda yadda More stuff goes here','0478816306','www.jerichosharman.com.au');
INSERT INTO users (githubName,email,userType,profiletype,firstName,lastName,photo,aboutmetitle,aboutme,mobile,portfoliolink) 
VALUES(50442868,'daniel.t.mcgee@gmail.com',1,1,'Danny','','https://avatars.githubusercontent.com/u/50442868?v=4','DEVELOPER','More about me stuff','04123423456','');


INSERT INTO hashed_passwords (id,hashed_password) VALUES (1,'$2b$10$1lzng8qKwE83WoshE/EHPu2E15DO/BMtZOUyVH1VnVtQLGGFv7paC');