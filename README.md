
# GITCONNECT
endpoints
-   api/gitconnect/gitdetails 
-   api/username/repos

---   
## **DESCRIPTION**

---   
## **FEATURES**

---   
## **FUNCTIONALITY**

---
## **SECURITY**
Gitconnect server makes the gitHub API calls using a private token for authentication. This token is kept in the .enc file under the label 'TOKEN' 

---  
## **SETTING UP THE SERVER**
create a file named '.env' in your root project folder and copy and paste the below into this file. 
```
PORT=
DATABASE=
EXPRESS_SESSION_SECRET_KEY=
TOKEN=
```
*Once completed, continue with the below steps;*

## A       **Choose a vacant port on your local machine and place it in the .env file next to 'PORT='**   
~~~
    eg. PORT=3000
~~~

## B       **Creating & Setting up the database.**    
1.   Stop the postgresql database if it is running   
2.   In the terminal window type the following to create the new database.
~~~
    createdb project3_db
~~~
3.   Be sure to copy the database name and place in the .env file for the DATABASE variable as seen below. replacing 'database_name' with your own database name as created above.   
~~~
    DATABASE=project3_db
~~~  

## C   **Generate a secret key from the CLI. Required**
1.  Create a random secret key
~~~ 
echo -n 'the seed phrase' | sha256sum
~~~

2.  Paste it in your .env file, replacing '\<your key goes here>'
~~~
EXPRESS_SESSION_SECRET_KEY=<your key goes here>
~~~

## D  **The server will require a git hub TOKEN for its github API calls**   
1. [follow these instructions to get a token](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token)   
2. Place the token in the .env file using the name 'TOKEN='< copy and paster your new token here >






   
### Step 2

# DEPENDENCIES

# PROJECT RESOURCES
miro.com



