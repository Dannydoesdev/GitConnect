# GitConnect

## The Portfolio creation and sharing hub - by developers, for developers.

Browse projects // Create and cutomise a profile // Add projects easily, directly from Github APIs // Tell the story of your project // Contact and be inspired by other developers

---

## Live site

### [Find the live site by clicking here](https://git--connect.herokuapp.com/)

### Note that 'v2' is under construction, and can be found below
---
## Contact

### You can find us at [Dannys Linkedin](https://www.linkedin.com/in/danieltmcgee/) + [Jericho's Github](https://github.com/Cjunk) + [Garmon's Github](https://github.com/misakigrim)
### Please reach out if you want to contribute to this project! Very open to it
--- 
## Introduction

GitConnect is a platform for developers to create, host and share their portfolios, while also discovering projects from other devs in the community. 

Think Dribbble or Behance for engineers. 


It comes with simple onboarding - using your Github username & API integration to add repos directly in the UI while the server handles fetching them from GitHubs API.

When a repo is added from Github it becomes a 'GitConnect Project' - allowing developers to add GitConnect specific information about the process, challenges, outcomes etc of the project. They can also add a live version of the project direct on the site which imports it as an iFrame.

--- 
## Inspiration
The inspiration for this project comes from our time in General Assemblies Software Engineering intensive, where we spoke about portfolios regularly. 

However the findability of other engineer portfolios on the internet leaves a lot to be desired.

While designer projects are hosted on several popular sites (Behance, Dribbble, Awwwards etc) - developers portfolios might appear on a blog or two. But, they mostly remain hidden in corners of peoples personal sites - only shared when they might want to apply for a new job.

--- 

## User stories:

As a developer, I want an easy way to upload and showcase my projects, so that I can share them with the development community, recruiters & friends

As a developer, I want a place where I can view interesting and inspiring projects by other devs, so that I can find inspiration, motivation, as well as connect with/work with other devs

As a recruiter/hiring engineer, I want a place where I can seek out and contact fresh talent so that I can proactively bring great engineers into our businesses

---
## Features:

-   Easy to get register (or browse without an account)
-   Pull your repos direct from Github and showcase as projects
-   Upload repo images
-   Create repo stories
-   Personalise your portfolio
-   Provide contact details and Bio
-   Link to your social media, portfolio

---
## v1 Stack:
- Node.JS
- Express
- PSQL database
- Cloudinary image upload
- Javascript
- Bootstrap
- Github API integration
- Heroku hosting

--- 

## Features:

- Simple registration
- Github API integration for importing repos as GitConnect Projects
- Project editing tools for 'GitConnect specific' information on the projects
- Profile editing tools
- A profile page for each user
- A project page for each projects
- Landing page for viewing other GitConnect profiles and projects

---

## v2 project:
### [Find the Live site by clicking here](https://git-connect-v2.vercel.app/)
### [Find the Repo site by clicking here](https://github.com/Dannydoesdev/GitConnect-v2)

---

## Project Resources

[Miro diagramming](https://miro.com/app/board/uXjVOtuEbWo=/)
[Figma designs](https://www.figma.com/file/K4HYl8z5A7Ajd0Elbadnva/GitConnect?node-id=0%3A1)

---
## **SECURITY**

Gitconnect server makes gitHub API calls using a private token for authentication. This token is kept in the .env file under the label 'TOKEN'


---

## Installing and running the application locally:
- Clone or Download a zip of the repo
- CD into gitconnect
- Install all necessary dependencies: ```npm install ```
- Run the project with: ```npm run start```

---
## **Setting up the server**
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
2.  In the terminal window type the following to create thedatabase

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
## **Cloudinary Setup**
---
- Create an account on cloudinary (this will cost a fee to server images to the public)
- Copy the api, cloud name and access token into your environemnt variables file.

```
CLOUD_KEY=
CLOUD_NAME=
CLOUD_SECRET=
```

---
## API endpoints    
.  GitHub 
- /gitconnect/gitdetails
    - /username/repos

- users/register
- users/myrepos
- users/getUsers




