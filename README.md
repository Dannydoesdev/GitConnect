# TITLE

# DESCRIPTION

# FEATURES

# FUNCTIONALITY

# GETTING STARTED

Generating a secret key from the command line. This will be used in conjuction with the postgresql database to security purposes.
~~~ 
(base) root@JERICHO-PC: "echo -n 'the seed phrase' | sha256sum"
~~~

Creating the database. 
- Stop the postgresql database if it is running
- In the terminal window type the following to create the new database.
~~~ 
(base) root@JERICHO-PC: 'createdb project3_db' 
~~~
- Be sure to copy the database name and place in the .env file for the DATABASE variable as seen below   
~~~
DATABASE=project3_db
~~~   

# DEPENDENCIES


