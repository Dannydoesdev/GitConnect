/* GITCONNECT SERVER 
    FILE: USERS API handeler 
    AUTHOR: Jericho Sharman   
    DATE: 05/2022   
    DESCRIPTION:*/
// ********************************************************************************************************************

// SET UP THE INCLUDES
const gitHubApi = {
  getUserDetails: `https://api.github.com/users/`,
};
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db.js");
const router = express.Router();
const axios = require("axios");
const USERS_TABLE_NAME = "users";
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.cloudinary_js_config();
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

  // First get the rest of the user data from GitHub if it exists.
  const sendingrequest = async () => {
    await axios // get some user details from github
      .get(gitHubApi.getUserDetails + req.body.gitHubName)
      .then((result) => {
        if (result.data) {
          // This user has data in gitHub
          // Insert the discovered GitHub details into their users database
          db.query(
            `INSERT INTO ${USERS_TABLE_NAME} 
                  (githubName,userType,profiletype,email,firstName,githubutrl,gitHubAvatar,gitHubrepos_url,gitHubFullName,gitHubCompany,gitHubBlog,gitHubTwitter,gitHubHirable,gitHubLocation,gitHubBio,gitHubMemberSince) 
                  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16);`,
            [
              req.body.gitHubName,
              req.body.userType,
              req.body.profiletype,
              req.body.email,
              req.body.name,
              result.data.url,
              result.data.avatar_url,
              result.data.repos_url,
              result.data.name,
              result.data.company,
              result.data.blog,
              result.data.twitter_username,
              result.data.hireable,
              result.data.location,
              result.data.bio,
              result.data.created_at,
            ]
          )
            // Retrieve the recently added user ID
            .then((dbres) => {
              db.query(`SELECT * FROM ${USERS_TABLE_NAME} WHERE email = $1;`, [req.body.email]).then((dbres) => {
                db.query(
                  // Store the new user ID and their hashed password in the hashed_password table
                  `INSERT INTO hashed_passwords (id,hashed_password) VALUES ($1,$2);`,
                  [dbres.rows[0].id, hash] // insert the new user id and hashed password into password table
                ).then((dbresults) => {
                  console.log(
                    "************************************ NEW REGISTERED USER IS ADDED. SENDING DATA BACK TO CLIENT"
                  ); // TODO: delete console.log
                  res
                    .status(200)
                    .json({
                      status: true,
                      firstTimeRego: "yes",
                      message: "New user added",
                      data: dbresults.rows[0],
                      githubprofilepic: result.data.avatar_url,
                    }); // respond new user successfully added.
                });
              });
            })
            .catch((reason) => {
              // If we reach here it will usually be due to a database error
              // console.log("ERROR ---> ", reason); // TODO: delete console log
              res.status(444).json({ message: reason.detail });
            });

          // console.log(dbres.rows[0].id, result.data);
        } else {
          console.log("-----------According to github this user doesnt exist");
          res.status(404).json({message: reason.detail, status:false,reason:"User not recognised in GitHub"})
          // TODO: Insert code to add this user to the database without a github presence.
        }

        return result;
      })
      .catch((err) => {
        console.log("-----------------THERE WAS AN ERROR IN RETRIVING THIS USERS DETAILS", err);
      });
  };
  sendingrequest();
});

router.get(`/getUsers`, (req, res) => {
  // TODO: REmove this so random people cannot view all the users in the database. This is for testing only
  ret = dbSelectQuery(`SELECT * FROM users;`, res);
  // res.json(ret)
});
router.post(`/myrepos`, (req, res) => {
  dbSelectQuery(`SELECT * FROM repoparameters;`, res);
});
router.post(`/reposById`, (req, res) => {
  dbSelectQuery(`SELECT * FROM repoparameters WHERE userid = ${req.body.gitConnectId};`, res);
});
router.post(`/repoDetailByRepoId`, (req, res) => {
  repoId = req.body.repoid;
  dbSelectQuery(`SELECT * FROM repoparameters WHERE repoid = '${repoId}';`, res);
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
      if (dbResults.rowCount) {
        res.json(dbResults.rows);
      } else {
        res.json({ message: "No data found" });
      }
    })
    .catch((reason) => {
      console.log("INTERNAL DATABASE ERROR", reason);
      res.status(500).json({ message: "No data in database" });
    });
  return result;
}
// router.post(`/images`, fileUpload.array('image', 5), function (req, res, next) {
//   console.log("Images ", req.file);
// });
module.exports = router;
