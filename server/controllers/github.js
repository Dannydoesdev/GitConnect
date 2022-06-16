const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db.js");
const { default: axios } = require("axios");
const router = express.Router();
require("dotenv").config();

// ********************************************************************************************************************
// CONSTANTS
const app = express(); // Initialise the app
const TOKEN = process.env.TOKEN
// ********************************************************************************************************************

function isAuthenticated(req, res, next) {
  if (req.session.authenticated) next();
  else next("route");
}
router.get("/", isAuthenticated, (req, res) => {
  //  Called on every /session request.
  // console.log(req.session) //
  // console.log("req.hostname", req.hostname);
  // console.log("req.sessionID", req.sessionID);
  // console.log("req.session.name", req.session.cookie);
  // console.log("req.session.authenticated", req.session.authenticated);
  console.log("User is authenticated"); //
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
    success: false,
  });
});

router.post(`/repos`, (req, res) => {
    //  Will send API call to github to pull all the repos by the name passed in from the client
    const name = req.body.name;
    axios({
      method: "get",
      headers: { Authorization: "token " + TOKEN },
      url: "https://api.github.com/user/repos",
    }).then((response) => {
      console.log(response);
    });
  res.json({ "hi": name });
});


module.exports = router;
