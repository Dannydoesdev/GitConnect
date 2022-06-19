/* GITCONNECT SERVER 
    FILE: USERS API handeler 
    AUTHOR: Jericho Sharman   
    DATE: 05/2022   
    DESCRIPTION:*/
// ********************************************************************************************************************
// SET UP THE INCLUDES
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db.js");
const router = express.Router();
const USERS_TABLE_NAME = "users";
// ********************************************************************************************************************
/*
  To register a new users, you MUST pass the following params as a minimum. The hashed password is stored on a separate table
  params
  {
      githubName: Their github name 
      userType: Type of users (enter '3' for Developer )
      profiletype: the type of profile they have on GitConnect (set to '1' Public)
      email: <users name>
      password: <users password>
  }
*/

router.post(`/register`, (req, res) => {
  // REGISTER A NEW USER
  if (!req.body.gitHubName || !req.body.email || !req.body.password) {
    // Ensure data is present
    res.status(400).json({ status: false, message: "Missing information" });
    return;
  }
  if (req.body.password != req.body.confirmPassword) {
    // Confirm passwords match
    res.status(400).json({ status: false, message: "Password do not match" });
    return;
  }
  if (
    // Validate password and name lengths
    req.body.gitHubName.length > 20 ||
    req.body.email.length > 100 ||
    req.body.password.length > 20 ||
    req.body.password.length < 4
  ) {
    res.status(400).json({ status: false, message: "Incorrect password length" });
    return;
  }
  // create the hashed password from password and email.
  const hash = createHash(req.body.email, req.body.password, 5); 
  // Add the new user to the database so as to get their unique ID
  db.query(
    `INSERT INTO ${USERS_TABLE_NAME} (githubName,userType,profiletype,email,firstName) VALUES ($1,$2,$3,$4,$5);`,
    [req.body.gitHubName, req.body.userType, req.body.profiletype, req.body.email, req.body.name]
  )
    // Retrieve the recently added user ID
    .then((dbres) => {
      db.query(`SELECT id FROM ${USERS_TABLE_NAME} WHERE email = $1;`, [req.body.email]).then((dbres) => {
        db.query(
          // Store the new user ID and their hashed password in the hashed_password table
          `INSERT INTO hashed_passwords (id,hashed_password) VALUES ($1,$2);`,
          [dbres.rows[0].id, hash] // insert the new user id and hashed password into password table
        ).then((dbresults) => {
          res.json({ status: true, message: "New user added" }); // respond new user successfully added.
        });
      });
    })
    .catch((reason) => {
      // If we reach here it will usually be due to a database error
      console.log("ERROR ---> ", reason); // TODO: delete console log
      res.status(400).json({ message: reason.detail });
    });
});

router.get(`/getUsers`, (req, res) => {
  // TODO: REmove this so random people cannot view all the users in the database.
  ret = dbSelectQuery(`SELECT * FROM users;`, res);
  // res.json(ret)
});
router.post(`/myrepos`, (req, res) => {
  dbSelectQuery(`SELECT * FROM repoparameters;`,res);
});

// ********************************************************************************************************************
// INTERNAL FUNCTIONS
function createHash(email, password) {
  return bcrypt.hashSync(password + email.toUpperCase(), 10, null);
}
function dbSelectQuery(theQuery, res) {
  //  Function to execute SQL code in the database
  result = db
    .query(theQuery)
    .then((dbResults) => {
      res.json(dbResults.rows);
    })
    .catch((reason) => {
      console.log("INTERNAL DATABASE ERROR", reason);
      res.status(500).json({ message: "No data in database" });
    });
  return result;
}

module.exports = router;
