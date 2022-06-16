/*
  Github API Caller
  Written by Jericho Sharman
  General Assembly 2022
*/
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db.js");
const { default: axios } = require("axios");
const router = express.Router();
require("dotenv").config();
// ********************************************************************************************************************
// CONSTANTS
const app = express(); // Initialise the app
const TOKEN = process.env.TOKEN; // Retrieves the TOKEN
// ********************************************************************************************************************

// test()  // In conjunction with the test function to test github calls on application startup

//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//      BASE Aand AUTHENTICATION ROUTES
router.get("/", __isAuthenticated, (req, res) => {
  console.log("User is authenticated"); //
  res.json({
    name: req.session.name,
    email: req.session.email,
  });
});

router.get("/", (req, res) => {
  //  Base route
  res.json({
    name: req.session.name,
    email: req.session.email,
    success: false,
  });
});
//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//    END POINTS
//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
router.post(`/gitdetails`, __isAuthenticated, (req, res) => {
  // Get Full github details
  //  GITHUB API call. Retrieve the user details. Pass the GitHum name in asthe paramater 'name'
  const name = req.body.name;
  console.log(`token ${TOKEN}`); // TODO: delete me
  axios({
    method: "get",
    headers: { Authorization: `token ${TOKEN}` },
    url: `https://api.github.com/users/${name}`,
  })
    .then((response) => {
      // console.log(response, "in /gitconnect/repos");
      res.json(response.data);
    })
    .catch((err) => {
      __errorHandler(err);
    });
});
router.post(`/username/repos`, __isAuthenticated, (req, res) => {
  //get the FULL repo data from GitHub for the username passed in variable 'name'
  /*   
   NOTES: NO AUTHENTICATION REQUIRED.
   Will get the FULL repo data from GitHub for the username passed in variable 'name'
  */
  const name = req.body.name;
  // console.log(`token ${TOKEN}`);
  axios({
    method: "get",
    url: `https://api.github.com/users/${name}/repos`,
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      __errorHandler(err, "**************** *********************************");
    });
});
router.post(["/gitdetails", "/username/repos"], (req, res) => {
  // User not authenticated default POST route
  //  Base route
  res.json({
    message: "User not authenticated",
    success: false,
  });
});

//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//            FUNCTIONS
//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function __isAuthenticated(req, res, next) {
  // Check to see if the current visitor is authenticated
  if (req.session.authenticated) next();
  else next("route");
}
function __errorHandler(err, variable) {
  console.log("ERROR---->", variable, err.message, "");
}
function test() {
  //  Used to test the github calls
  console.log(
    `--------------CHECKING REPO CALL FROM GIT HUB with token ${TOKEN}`
  );
  axios({
    method: "get",
    // headers: { 'Authorization': `token ${TOKEN}` },
    url: "https://api.github.com/user/repos",
  })
    .then((response) => {
      console.log(response, "in /gitconnect/repos");
    })
    .catch((err) => {
      console.log("REPO ERROR FOUND");
      __errorHandler(err);
    });
  console.log({ hi: "CJUNK" });
  console.log("REPO CHECK COMPLETED ----------------------");
}

module.exports = router;
