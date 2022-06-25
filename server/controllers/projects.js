const express = require("express");
const db = require("../db/db.js");
const router = express.Router();
const fileupload = require("express-fileupload");
const fs = require("fs");
const cloudinary = require("cloudinary");
const { response } = require("express");
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
    let repoID = req.body.id;
    // let repoID = repoid;
    let status = 1;
    let isFork = '';

    if (req.body.fork) {
      isFork = 1;
    } else {
      isFork = 0;
    }
   

    let sql = `INSERT INTO ${PROJECTS_TABLE_NAME} (userID, gitHubRepoName, repoID, status, projectName, description, githubrepourl, collaborators_url, issue_events_url, branches_url, tags_url, languages_url, contributors_url, subscribers_url, commits_url, created_at, updated_at, license, langone, htmlurl, isfork, stargazers_count, watchers_count, subscribers_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24);`;
    let values = [id, projectName, repoID, status, req.body.name, req.body.description, req.body.githubrepourl, req.body.collaborators_url, req.body.issue_events_url, req.body.branches_url, req.body.tags_url, req.body.languages_url, req.body.contributors_url, req.body.subscribers_url, req.body.commits_url, req.body.created_at, req.body.updated_at, req.body.licensetype, req.body.language, req.body.html_url, isFork, req.body.stargazers_count, req.body.watchers_count, req.body.subscribers_count];


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
  let projectName = req.body["project-name"];
  let process = req.body["project-process"];
  let challenges = req.body["project-challenges"];
  let outcomes = req.body["project-outcomes"];
  let appLink = req.body["project-link"]
  let status = parseInt(req.body.status);
  let userID = req.session.body.id;
  if (repoId) {
    const file = req.files;
    const mainresponder = res; // increase the scope
    const upload = async (req, res) => {
      try {
        let sql = `UPDATE ${PROJECTS_TABLE_NAME} SET description = $1, process = $3,challenges = $4, outcomes = $5, status = $6, projectName = $8, app_link = $9 WHERE repoID = $2 AND userId = $7;`;
        values = [description, repoId, process, challenges, outcomes, status, userID, projectName, appLink];
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
  console.log("THE req.body", req.body);
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
  let appLink = req.body["project-link"];
  let status = parseInt(req.body.status);
  let userID = req.session.body.id;
  console.log('hello')
  if (!req.files) {
    res.send("File was not found");
    return;
  }
  console.log('hello2')
  if (repoId) {
    console.log('hello3')
    // CLOUDINARY SEcTion. MUST BE FIRST TO GET THE <url></url>
    const file = req.files;
    let responseObj = {};
    responseObj.message = {};
    const mainresponder = res; // increase the scope
    const upload = async (req, res) => {
      try {
        console.log('hello4')
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
              sql = `UPDATE ${PROJECTS_TABLE_NAME} SET description = $1, process = $3,challenges = $4, outcomes = $5, status = $6 WHERE repoID = $2 AND userId = $7;`;
              values = [description, repoId, process, challenges, outcomes, status, userID];
            }
            console.log("THE VALUES ARE", values);
            db.query(sql, values)
              .then((dbres) => {
                if (dbres.rowCount) {
                  theDatabaseMessage = "Database updated correctly";
                  console.log('database updated')
                } else {
                  theDatabaseMessage = "Database did not update correctly";
                  console.log(theDatabaseMessage)
                  mainresponder.json({
                    status: STATUS_NOT_OK,
                    file: "File not Uploaded",
                    message: theDatabaseMessage,
                  });
                }
              })
              .then(() => {
                if (appLink) {
                  db.query(`UPDATE ${PROJECTS_TABLE_NAME} SET app_link = $1 WHERE repoID = $3 AND userId = $2;`, [appLink, userID, repoId])
                    .then(dbres => {
                      console.log('app link added')
                      theDatabaseMessage = "App link and file uploaded";
                      mainresponder.json({
                        status: STATUS_OK,
                        file: "File Uploaded",
                        message: theDatabaseMessage,
                      });
                      })
                }
                else {
                    theDatabaseMessage =  "File uploaded with no app link"
                    mainresponder.json({
                      status: STATUS_OK,
                      file: "File Uploaded",
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
