const express = require("express");
const db = require("../db/db.js");
const router = express.Router();
const fileupload = require("express-fileupload");
const fs = require("fs");
const cloudinary = require("cloudinary");
require("dotenv").config();
const USERS_TABLE_NAME = "users";
const PROJECTS_TABLE_NAME = "repoparameters";
const STATUS_NOT_OK = "not ok";
const STATUS_OK = "ok";

router.use(fileupload({ useTempFiles: true, tempFileDir: "./client/tmp/" }));

//Handle POST requests to /api/projects to create project after searching repos
router.post("/addRepo", (req, res) => {
  console.log(req.body);
  // githubname: req.session.body.githubname
  // const githubname = req.session.body.githubname;
  const id = req.session.body.id;

  console.log(req.body.username);
  console.log(req.body.reponame);

  // console.log(req.body.githubname);

  // NEED TO PUT THIS SEARCH BEHIND A LOGGED IN USER ONLY
  if (!id) {
    res.status(401).json({ sucess: false, message: "Must be logged in" });
  } else {
    let projectName = req.body.reponame;
    // let repoID = req.body.id;
    let repoID = Math.floor(Math.random() * 10000);
    let status = 1;
    let isFork = '';
    console.log(req.body.fork)
    if (req.body.fork) {
      isFork = 1;
    } else {
      isFork = 0;
    }
    console.log(req.body.licensetype)
    console.log(`is Fork? ${isFork}`)

    // let licenseArr = Object.values(req.body.license);
    // console.log(licenseArr)
    // let language = languageArr.join("");
    // console.log(language)
    // repoID TEXT PRIMARY KEY UNIQUE NOT NULL, -- eg math.random
    // gitHubRepoName TEXT, -- namr of repo (not user)
    // userID SMALLINT REFERENCES users(id),
    // status BIT NOT NULL, -- Available for viewing Y or N
    // projectName TEXT, -- gitconnect project name
    // description TEXT, -- other stuff should be gitconnect NOT github
    // process TEXT,
    // challenges TEXT,
    // outcomes TEXT,
    // tags TEXT,
    // titleimage TEXT,
    // projectImageUrl TEXT,
    // githuburl TEXT,
    // collaborators_url TEXT,
    // issue_events_url TEXT,
    // branches_url TEXT,
    // tags_url TEXT,
    // languages_url TEXT,
    // contributors_url TEXT,
    // subscribers_url TEXT,
    // commits_url TEXT,
    // created_at TEXT,
    // updated_at TEXT,
    // license TEXT,
    // langone TEXT,
    // langtwo TEXT,
    // langthree TEXT,
    // langfour TEXT,
    // htmlurl TEXT,
    // isfork BIT, --true/false for if it is a fork
    // stargazers_count INT, -- number of stargazers
    // watchers_count INT, -- number of watchers
    // subscribers_count INT, -- number of subscribers

    // to add later:  langtwo, langthree, langfour,
    // req.body.langtwo, req.body.langthree, req.body.langfour, 

    let sql = `INSERT INTO ${PROJECTS_TABLE_NAME} (userID, gitHubRepoName, repoID, status, projectName, description, githuburl, collaborators_url, issue_events_url, branches_url, tags_url, languages_url, contributors_url, subscribers_url, commits_url, created_at, updated_at, license, langone, htmlurl, isfork, stargazers_count, watchers_count, subscribers_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24);`;
    let values = [id, projectName, repoID, status, req.body.name, req.body.description, req.body.githuburl, req.body.collaborators_url, req.body.issue_events_url, req.body.branches_url, req.body.tags_url, req.body.languages_url, req.body.contributors_url, req.body.subscribers_url, req.body.commits_url, req.body.created_at, req.body.updated_at, req.body.licensetype, req.body.language, req.body.html_url, isFork, req.body.stargazers_count, req.body.watchers_count, req.body.subscribers_count];

    console.log(values)
    console.log(values.length)
    console.log(JSON.stringify(req.body.license))
    // let sql = `INSERT INTO ${PROJECTS_TABLE_NAME} (userID, gitHubRepoName, repoID, status) VALUES ($1, $2, $3, $4);`;
    // let values = [id, projectName, repoID, status];
    // console.log(values);
    db.query(sql, values)
      .then((dbres) => {
        console.log("project created");
        res.json({ sucess: true, message: "Project created" });
      })
      .catch((reason) => {
        console.log(reason);
        res.status(500).json({ sucess: false, message: "Unknown error occured" });
      });
  }
});

//Handle POST requests to /api/projects/editform to allow users to add custom info to project via edit form
router.post("/editform_no_image/", (req, res) => {
  if (!req.session.id) {res.status(401).json({ sucess: false, message: "Must be logged in" });}
  const repoId = req.body.repoId;
  console.log("THE req.body", req.body);
  let description = req.body["project-description"];
  // let projectName = req.body["project-name"];
  let process = req.body["project-process"];
  let challenges = req.body["project-challenges"];
  let outcomes = req.body["project-outcomes"];
  let status = parseInt(req.body.status);
  let userID = req.session.body.id;
  if (repoId) {
    const file = req.files;
    const mainresponder = res; // increase the scope
    const upload = async (req, res) => {
      try {
        let sql = `UPDATE ${PROJECTS_TABLE_NAME} SET description = $1, process = $3,challenges = $4, outcomes = $5, status = $6 WHERE repoID = $2 AND userId = $7;`;
        values = [description, repoId, process, challenges, outcomes, status, userID];
        console.log("THE VALUES ARE", values);
        db.query(sql, values)
          .then((dbres) => {
            if (dbres.rowCount) {
              theDatabaseMessage = "Database updated correctly";
              mainresponder.json({
                status: STATUS_OK,
                file: "Uploaded",
                message: theDatabaseMessage,
              });
            } else {
              theDatabaseMessage = "Database did not update correctly";
              mainresponder.json({
                status: STATUS_OK,
                file: "Uploaded",
                message: theDatabaseMessage,
              });
            }
          })
          .catch((reason) => {
            console.log(reason);
            mainresponder.status(500).json({ sucess: false, message: "Unknown database error occured" });
          });
        return;
      } catch (error) {
        console.log(error);
        mainresponder.json({ status: STATUS_NOT_OK, message: "missing file" });
        return;
      }
    };
    upload();
  }
});
router.post("/editform/", (req, res) => {
  //   removing session check for testing purposes

  let sessionId = req.session.id;
  if (!sessionId) {
    res.status(401).json({ sucess: false, message: "Must be logged in" });
  }
  console.log(req.body, "the request body");
  const repoId = req.body.repoId;

  console.log("THE req.body", req.body);
  let description = req.body["project-description"];
  let projectName = req.body["project-name"];
  let process = req.body["project-process"];
  let challenges = req.body["project-challenges"];
  let outcomes = req.body["project-outcomes"];
  let status = parseInt(req.body.status);
  let userID = req.session.body.id;
  if (!req.files) {
    res.send("File was not found");
    return;
  }
  if (repoId) {
    // CLOUDINARY SEcTion. MUST BE FIRST TO GET THE <url></url>
    const file = req.files;
    const mainresponder = res; // increase the scope
    const upload = async (req, res) => {
      try {
        const result = await cloudinary.uploader.upload(file.upload.tempFilePath, (result) => {
          if (result.public_id) {
            fs.rename(file.upload.tempFilePath, file.upload.tempFilePath + ".jpg", () => {});
            let sql = "";
            let values = [];
            if (file.upload.tempFilePath) {
              sql = `UPDATE ${PROJECTS_TABLE_NAME} SET description = $1, process = $3,challenges = $4, outcomes = $5, status = $6, projectimageurl = $7 WHERE repoID = $2 AND userId = $8;`;
              values = [
                description,
                repoId,
                process,
                challenges,
                outcomes,
                status,
                file.upload.tempFilePath.replace("client", ".") + ".jpg",
                userID,
              ];
            } else {
              let sql = `UPDATE ${PROJECTS_TABLE_NAME} SET description = $1, process = $3,challenges = $4, outcomes = $5, status = $6 WHERE repoID = $2 AND userId = $7;`;
              values = [description, repoId, process, challenges, outcomes, status, userID];
            }
            console.log("THE VALUES ARE", values);
            db.query(sql, values)
              .then((dbres) => {
                if (dbres.rowCount) {
                  theDatabaseMessage = "Database updated correctly";
                  mainresponder.json({
                    status: STATUS_OK,
                    file: "Uploaded",
                    message: theDatabaseMessage,
                  });
                } else {
                  theDatabaseMessage = "Database did not update correctly";
                  mainresponder.json({
                    status: STATUS_OK,
                    file: "Uploaded",
                    message: theDatabaseMessage,
                  });
                }
              })
              .catch((reason) => {
                console.log(reason);
                mainresponder.status(500).json({ sucess: false, message: "Unknown database error occured" });
              });
            return;
          }
        });
      } catch (error) {
        console.log(error);
        mainresponder.json({ status: STATUS_NOT_OK, message: "missing file" });
        return;
      }
      return;
    };

    upload();
  }
});

router.get("/", (req, res) => {
  let sql = `SELECT * FROM ${PROJECTS_TABLE_NAME} JOIN ${USERS_TABLE_NAME} ON users.id = repoparameters.userid WHERE status = '1';`;
  db.query(sql)
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((err) => {
      res.status(404).json({ message: "Cannot locate repos" });
    });
});

router.get("/:repoid", (req, res) => {
  const repoid = req.params.repoid;
  let sql = `SELECT * FROM ${PROJECTS_TABLE_NAME} JOIN ${USERS_TABLE_NAME} ON users.id = repoparameters.userid WHERE repoparameters.repoid = $1;`;
  db.query(sql, [repoid])
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((err) => {
      res.status(404).json({ message: "Cannot locate repo" });
    });
});


module.exports = router;
