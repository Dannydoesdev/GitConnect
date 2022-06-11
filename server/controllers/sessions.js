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
// ********************************************************************************************************************
// CREATE THE ROUTER
// router.post(`/login`, (req, res) => {
//   // VALIDATE THE PASSED VARIABLES
//   const { email, password } = req.body;
//   if (!email) {
//     res.status(400).json({ status: "false", message: "Missing email details" });
//     return;
//   }
//   if (!password) {
//     res.status(400).json({ status: "false", message: "Missing Password" });
//     return;
//   }
//   if (password.length < 10 || password.length > 255) {
//     res
//       .status(400)
//       .json({ status: "false", message: "Incorrect Password length" });
//     return;
//   }
//   console.log("req.sessionID = ", req.sessionID,email); //TODO: delete console.log

//   db.query("SELECT email,userType,profileType,memberShipType,title,firstName,lastName,photo,userLevel,userPcode,hashed_password  FROM users WHERE email = $1;", [email])
//   .then((dbres) => {
//     if (req.session.authenticated) {
//       console.log("User already logged in "); //TODO: delete console.log
//       res.json(req.session);
//     } else {
//       bcrypt.compare(
//         password + email.toUpperCase(),
//         dbres.rows[0].hashed_password,
//         function (err, result) {
//           if (result) {
//             delete dbres.rows[0].hashed_password
//             console.log("The user has successfully logged in"); //TODO: delete console.log
//             req.session.authenticated = true;
//             req.session.body = dbres.rows[0];
//             res.cookie("email", dbres.rows[0].email);
//             res.cookie("name", dbres.rows[0].firstname, { httpOnly: false });
//             res.status(200).json(req.session);
//           } else {
//             //  Wrong password correct email.
//             res
//               .status(BAD_CREDENTIALS_STATUS)
//               .json({ status: "false", message: BAD_CREDENTIALS });
//           }
//         }
//       );
//     }
//   })
//   .catch((reason) => {
//     // The user was not found in the database
//     res.status(BAD_CREDENTIALS_STATUS).json({ status: "false", message: BAD_CREDENTIALS });
//   });
// });

function isAuthenticated(req, res, next) {
  if (req.session.authenticated) next();
  else next("route");
}
router.get("/", isAuthenticated, (req, res) => {
  //  Called on ever page refresh to check if the user is already logged in.
  // console.log(req.session) //
  // console.log("req.hostname", req.hostname);
  // console.log("req.sessionID", req.sessionID);
  // console.log("req.session.name", req.session.cookie);
  // console.log("req.session.authenticated", req.session.authenticated);
  console.log("User already logged in "); //
  res.json({
    name: req.session.name,
    email: req.session.email,
  });
});
router.get("/", (req, res) => {
  //  If the user is not authenticated then come to this route. FIXME: clean up 
  res.json({
    name: req.session.name,
    email: req.session.email,
  });
});
router.delete("/", (req, res) => {
  //  LOG the user OUT. Deletes the session cookie.
  req.session.destroy();
  res.json({ success: true });
});
module.exports = router;