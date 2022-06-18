/* SERVER
    FILE: SESSIONS API handeler 
    AUTHOR:  
    DATE:   
    DESCRIPTION:*/
// ********************************************************************************************************************
// SET UP THE INCLUDES
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db.js");
const router = express.Router();
const BAD_CREDENTIALS = "BAD CREDENTIALS"
const BAD_CREDENTIALS_STATUS = 403
const USERS_TABLE_NAME = "users"
// ********************************************************************************************************************
// CREATE THE ROUTER
router.post(`/login`, (req, res) => {
  // VALIDATE THE PASSED VARIABLES
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ status: false, message: "Missing email details" });
    return;
  }
  if (!password) {
    res.status(400).json({ status: false, message: "Missing Password" });
    return;
  }
  if (password.length < 4 || password.length > 255) {
    res
      .status(400)
      .json({ status: false, message: "Incorrect Password length" });
    return;
  }
  console.log("req.sessionID = ", req.sessionID,email); //TODO: delete console.log

  db.query(
    `SELECT email,users.id,firstname,hashed_password FROM ${USERS_TABLE_NAME} JOIN hashed_passwords ON users.id = hashed_passwords.id WHERE email = $1;`,
    [email],
  )
    .then((dbres) => {
      if (req.session.authenticated) {
        console.log("This user is already logged in ", req.session.body.firstname); //TODO: delete console.log
        res.json(req.session);
      } else {
        bcrypt.compare(
          password + email.toUpperCase(),
          dbres.rows[0].hashed_password,
          function (err, result) {
            if (result) {
              delete dbres.rows[0].hashed_password;
              console.log("The user has successfully logged in"); //TODO: delete console.log
              req.session.authenticated = true;
              // req.session.id = dbres.rows[0].id;
              req.session.body = dbres.rows[0];
              console.log("DATA FROM DATABASE",dbres.rows[0])
              res.cookie("gitConnectId",dbres.rows[0].id)
              res.cookie("email", dbres.rows[0].email);
              res.cookie("firstname", dbres.rows[0].firstname, { httpOnly: false });
              res.status(200).json(req.session);
            } else {
              //  Wrong password correct email.
              res
                .status(BAD_CREDENTIALS_STATUS)
                .json({ status: false, message: BAD_CREDENTIALS });
            }
          }
        );
      }
    })
    .catch((reason) => {
      // The user was not found in the database
      res
        .status(BAD_CREDENTIALS_STATUS)
        .json({ status: false, message: BAD_CREDENTIALS });
    });
});

function isAuthenticated(req, res, next) {
  if (req.session.authenticated) next();
  else next("route");
}
router.get("/", isAuthenticated, (req, res) => {
  res.status(200).json({
    firstname: req.session.body.firstname,
    id: req.session.body.id,
    email: req.session.body.email,
    success: true,
  });
});
router.get("/delete", isAuthenticated, (req, res) => {
  //  LOG the user OUT. Deletes the session cookie.
  req.session.destroy();
  res.json({ success: true });
});

router.get("/", (req, res) => {
  //  If the user is not authenticated then come to this route. FIXME: clean up 
  res.json({
    name: req.session.name,
    email: req.session.email,
    message:"User not authenticated",
    success:false
  });
});
router.delete("/", isAuthenticated,(req, res) => {
  //  LOG the user OUT. Deletes the session cookie.
  req.session.destroy();
  res.json({ success: true });
});
router.delete("/",  (req, res) => {
  //  Attempt to delete however the user wasnt even logged in to begin with
  res.json({ success: false });
});
module.exports = router;