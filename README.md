# GITCONNECT

---   
## DESCRIPTION

---   
## FEATURES

---   
## FUNCTIONALITY


---
### SECURITY
Gitconnect server makes the gitHub API calls using a private token for authentication. This token is kept in the .enc file under the label 'TOKEN'
---   
## GETTING STARTED

Generating a secret key from the command line. This will be used in conjuction with the postgresql database to security purposes.
~~~ 
echo -n 'the seed phrase' | sha256sum
~~~

Creating & Setting up the database. 
### Step 1.
- Stop the postgresql database if it is running
- In the terminal window type the following to create the new database.
~~~ 
createdb project3_db
~~~
- Be sure to copy the database name and place in the .env file for the DATABASE variable as seen below. replacing 'database_name' with your own database name as created above.   
~~~
DATABASE=project3_db
~~~   
### Step 2

# DEPENDENCIES

# PROJECT RESOURCES
miro.com



