# **GITCONNECT**
The Developers & Recruiters dream. 

A personalised GitHub portfolio creating experience. Browse projects, read the stories, see the code, contact the developer. 


![alt text]<img src="https://res.cloudinary.com/dc7oti3kw/image/upload/v1656086608/GitConnectFrontPage_dicuzr.jpg"  width="90%" height="90%">

# **INSTALATION**




## **FEATURES**
---
    Showcase your repos
    Upload repo images
    Create repo stories
    Personalise your portfolio
    Search our databse
    Choose your featured repos
    Provide contact details and Bio
    Have direct contact with potential recruits
    Pull your repos from Gitgub
    Link to your social media, portfolio

## **DEMO**
[![Demo CountPages alpha](https://share.gifyoutube.com/KzB6Gb.gif)](https://www.youtube.com/watch?v=yHM5VaXtpVY)

## **FUNCTIONALITY**
---

## ** TECHNICAL FUNCTIONALITY**
---
    Images are uploaded from the client side to to the server then dispatched and hosted on Cloudinary
    GitConnect deployed onto Heroku.



## **SECURITY**
---
    Gitconnect server makes the gitHub API calls using a private token for authentication. This token is kept in the .env file under the label 'TOKEN'



## **SETTING UP THE SERVER**
---
create an environemntal variables file named '.env' in your root project folder and copy and paste the below into this file.
```
PORT=
DATABASE=
EXPRESS_SESSION_SECRET_KEY=
TOKEN=
```

_Once completed, continue with the below steps;_

## A **Choose a vacant port on your local machine and place it in the .env file next to 'PORT='**

```
    eg. PORT=3000
```

## B **Creating & Setting up the database.**

1.  Stop the postgresql database if it is running
2.  In the terminal window type the following to create the new database.

```
    createdb project3_db
```

3.  Be sure to copy the database name and place in the .env file for the DATABASE variable as seen below. replacing 'database_name' with your own database name as created above.

```
    DATABASE=project3_db
```

## C **Generate a secret key from the CLI. Required**

1.  Create a random secret key

```
echo -n 'the seed phrase' | sha256sum
```

2.  Paste it in your .env file, replacing '\<your key goes here>'

```
EXPRESS_SESSION_SECRET_KEY=<your key goes here>
```

## D **The server will require a git hub TOKEN for its github API calls**

1. [follow these instructions to get a token](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token)
2. Place the token in the .env file using the name 'TOKEN='< copy and paster your new token here >

---

## **SETTING UP THE CLOUDINARY**
---
- Create an account on cloudinary
- copy the api, cloud name and access token into your .env file.

```
CLOUD_KEY=
CLOUD_NAME=
CLOUD_SECRET=
```

- 'npm install fs' for file access. This is used to remove the temporary file of the server once completed the upload t ocloudinary.
- The dependancy 'express-fileupload' was also installed to handle the file uploads at the server side. Uploaded files are stored in a temporary folder. You will have to write the code to delete these temporary files. use 'file.upload.tempFilePath' to locate the path of the temp file.

```
const file = req.files;
fs.unlinkSync(file.upload.tempFilePath);
```

# DEPENDENCIES
---

# PROJECT RESOURCES
---
miro.com
[Heroku Cheat sheet](https://gist.git.generalassemb.ly/katie/2b04e662ffc32713aad1b07747aceed9)
[Cloudinary] (https://cloudinary.com/)


<br>
endpoints

- api/gitconnect/gitdetails
- api/username/repos

