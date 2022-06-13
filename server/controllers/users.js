/* SERVER 
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
// CREATE THE ROUTER
router.post(`/createNewUser`, (req, res) => {
  console.log(req.body);
  if (req.body.password != req.body.confirmPassword) {
    res.status(400).json({ status: false, message: "Password do not match" });
    return;
  }
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).json({ status: false, message: "Missing information" });
    return;
  }
  const hash = createHash(req.body.email, req.body.password, 5);

  if (
    req.body.name.length > 20 ||
    req.body.email.length > 100 ||
    req.body.password.length > 20 ||
    req.body.password.length < 10
  ) {
    res.status(400).json({ status: false, message: "Incorrect password length" });
    return;
  }
  db.query(
    `INSERT INTO ${USERS_TABLE_NAME} (email,firstname,hashed_password) VALUES ($1,$2,$3);`,
    [req.body.email, req.body.name, hash]
  )
    .then((dbres) => {
      res.json({ status: true, message: "New user added" });
    })
    .catch((reason) => {
      console.log("ERROR ---> ", reason.detail);
      res.status(400).json({ message: reason.detail });
    });
});

router.get(`/getUsers`, (req, res) => {
  dbSelectQuery(`SELECT * FROM ${USERS_TABLE_NAME}`, res);
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
      res.status(500).json({ message: "Cannot find data" });
    });
  return result;
}

module.exports = router;
