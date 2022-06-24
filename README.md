# **GITCONNECT**
The Developers & Recruiters dream. 

Linking your portfolio with your GitHub repositories.

A personalised GitHub portfolio creating experience. Browse projects, read the stories, see the code, contact the developer, personalised project images,  


![alt text]<img src="https://res.cloudinary.com/dc7oti3kw/image/upload/v1656086608/GitConnectFrontPage_dicuzr.jpg"  width="90%" height="90%">

## **FEATURES**
---
-    Easy to get started
-   Showcase your repos
-   Upload repo images
-   Create repo stories
-   Personalise your portfolio
-   Search our databse
-   Choose your featured repos
-   Provide contact details and Bio
-   Have direct contact with potential recruits
-   Pull your repos from Gitgub
-   Link to your social media, portfolio



## **DEMO**
[![Demo CountPages alpha](https://share.gifyoutube.com/KzB6Gb.gif)](https://www.youtube.com/watch?v=yHM5VaXtpVY)


## ** TECHNICAL FUNCTIONALITY**
---
    Images are uploaded from the client side to to the server then dispatched and hosted on Cloudinary
    


## **SECURITY**
---
    Gitconnect server makes the gitHub API calls using a private token for authentication. This token is kept in the .env file under the label 'TOKEN'

## The GitConnect Project Development
---
GitConnect deployed onto Heroku.


## INSTALATION GUIDE. 
---
Assumed knowledge for this installation guide.
NodeJs
Javascript
Setting up environment variables


---
## **SETTING UP THE SERVER**
---
Setup your environment variables for the server, heroku and cloudinary as below;
```
PORT=
DATABASE=
EXPRESS_SESSION_SECRET_KEY=
TOKEN=
CLOUD_KEY=
CLOUD_NAME=
CLOUD_SECRET=
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
    createdb GitConnect_db
```

3.  Copy the database name and place in environment variables for 'DATABASE' 

```
    DATABASE=GitConnect_db
```

## C **Generate a secret key from the CLI.**

1.  Create a random secret key

```
echo -n 'the seed phrase' | sha256sum
```

2.  Paste it in your environmental variables file, replacing

```
EXPRESS_SESSION_SECRET_KEY=<your key goes here>
```

## D **The server will require a git hub TOKEN for its github API calls**

1. [follow these instructions to get a token](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token)
2. Place the token in the .env file using the name 'TOKEN='< copy and paster your new token here >

---
## **SETTING UP THE CLOUDINARY**
---
- Create an account on cloudinary (this will cost a fee to server images to the public)
- copy the api, cloud name and access token into your environemnt variables file.

```
CLOUD_KEY=
CLOUD_NAME=
CLOUD_SECRET=
```

# DEPENDENCIES
Install all the dependies....
~~~
npm i
~~~
---





# PROJECT RESOURCES
---
miro.com
[Heroku Cheat sheet](https://gist.git.generalassemb.ly/katie/2b04e662ffc32713aad1b07747aceed9)
[Cloudinary] (https://cloudinary.com/)


<br>
API endpoints    
.  GitHub 
- /gitconnect/gitdetails
    - /username/repos

- users/register
- users/myrepos
- users/getUsers

