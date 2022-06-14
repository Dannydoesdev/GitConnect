-- INITIALISE THE STATIC data for the database

-- USER TYPES
INSERT INTO usertypes (id, typename,typedescription) VALUES(3,'Developer','Software developers conceive of, design, and build computer programs');
INSERT INTO usertypes (id,typename,typedescription) VALUES(4,'Recruiter','Experts in the finding, screening and attracting of applicants for open positions.');
INSERT INTO usertypes (id,typename,typedescription) VALUES(2,'Database Administrator','Takes care of the GitConnect database');
INSERT INTO usertypes (id,typename,typedescription) VALUES(1,'Site God','Typically the developers of this site');

-- PROFILE TYPE
INSERT INTO profiletype (id,thedescription) VALUES(1,'Public');
INSERT INTO profiletype (id,thedescription) VALUES(2,'Private');
INSERT INTO profiletype (id,thedescription) VALUES(3,'Away');
INSERT INTO profiletype (id,thedescription) VALUES(4,'Not Available');

-- SOCIAL MEDIA TYPES
INSERT INTO socialmediatypes (mediatype,homepage) VALUES ('Facebook','https://www.facebook.com/');
INSERT INTO socialmediatypes (mediatype,homepage) VALUES ('Twitter','https://twitter.com/');
INSERT INTO socialmediatypes (mediatype,homepage) VALUES ('LinkedIn','https://www.linkedin.com/');
INSERT INTO socialmediatypes (mediatype,homepage) VALUES ('YouTube','https://www.youtube.com/');
INSERT INTO socialmediatypes (mediatype,homepage) VALUES ('Instagram','https://www.instagram.com/?hl=en');
INSERT INTO socialmediatypes (mediatype,homepage) VALUES ('Tumblr','https://www.tumblr.com/');
INSERT INTO socialmediatypes (mediatype,homepage) VALUES ('Flickr','https://www.flickr.com/');
INSERT INTO socialmediatypes (mediatype,homepage) VALUES ('Reddit','https://www.reddit.com/');
INSERT INTO socialmediatypes (mediatype,homepage) VALUES ('Snapchat','https://www.snapchat.com/');
INSERT INTO socialmediatypes (mediatype,homepage) VALUES ('stackoverflow','https://stackoverflow.com/');

-- PROGRAMMING LANGUAGES
INSERT INTO programminglanguages (languagename) VALUES ('HTML & CSS');
INSERT INTO programminglanguages (languagename) VALUES ('Python');
INSERT INTO programminglanguages (languagename) VALUES ('Java');
INSERT INTO programminglanguages (languagename) VALUES ('JavaScript');
INSERT INTO programminglanguages (languagename) VALUES ('Swift');
INSERT INTO programminglanguages (languagename) VALUES ('C++');
INSERT INTO programminglanguages (languagename) VALUES ('C#');
INSERT INTO programminglanguages (languagename) VALUES ('R');
INSERT INTO programminglanguages (languagename) VALUES ('PHP');
INSERT INTO programminglanguages (languagename) VALUES ('TypeScript');
INSERT INTO programminglanguages (languagename) VALUES ('Perl');
INSERT INTO programminglanguages (languagename) VALUES ('PowerShell');
INSERT INTO programminglanguages (languagename) VALUES ('Visual Basic .NET');
INSERT INTO programminglanguages (languagename) VALUES ('SQL');
INSERT INTO programminglanguages (languagename) VALUES ('Delphi');
INSERT INTO programminglanguages (languagename) VALUES ('MATLAB');
INSERT INTO programminglanguages (languagename) VALUES ('Ruby');
INSERT INTO programminglanguages (languagename) VALUES ('Shell');
INSERT INTO programminglanguages (languagename) VALUES ('Scala');
INSERT INTO programminglanguages (languagename) VALUES ('Golang');