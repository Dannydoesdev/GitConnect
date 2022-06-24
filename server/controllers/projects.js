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
  // githubname: req.session.body.githubname
  const githubname = req.session.body.githubname;
  const id = req.session.body.id;
  console.log(req.body.githubname);
  // NEED TO PUT THIS SEARCH BEHIND A LOGGED IN USER ONLY
  if (!id) {
    res.status(401).json({ sucess: false, message: "Must be logged in" });
  } else {
    let projectName = req.body.reponame;
    // DONT THINK WE NEED repoID - or can be a serial primary key
    let repoID = Math.floor(Math.random() * 1000);
    let status = 1;
    let sql = `INSERT INTO ${PROJECTS_TABLE_NAME} (userID, gitHubRepoName, repoID, status) VALUES ($1, $2, $3, $4);`;
    let values = [id, projectName, repoID, status];
    console.log(values);
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

router.post("/editform/", (req, res) => {
//   removing session check for testing purposes

  let sessionId = req.session.id;
  if (!sessionId) {
      res.status(401).json({ sucess: false, message: "Must be logged in" });
  } 
  const repoId = req.body.repoId;
  if (!req.files) {
    res.send("File was not found");
    return;
  }
  let description = req.body["project-description"];
  let projectName = req.body["project-name"];
  let process = req.body["project-process"];
  let challenges = req.body["project-challenges"];
  let outcomes = req.body["project-outcomes"];
  let status = parseInt(req.body.status);
  let userID = req.session.body.id;

  if (repoId) {
    //   res.status(400).json({ sucess: false, message: "Please provide a project name" });
    // } else if (!description) {
    //   res.status(400).json({ sucess: false, message: "Please provide a project description" });
    // } else if (!process) {
    //   res.status(400).json({ sucess: false, message: "Please enter details about the process of the project" });
    // } else if (!challenges) {
    //   res.status(400).json({ sucess: false, message: "Please enter details about challenges you faced" });
    // } else if (!outcomes) {
    //   res.status(400).json({ sucess: false, message: "Please enter details about the project outcomes" });
    // } else {
    // CLOUDINARY SEcTion. MUST BE FIRST TO GET THE <url></url>
    const file = req.files;
    const mainresponder = res; // increase the scope
    const upload = async (req, res) => {
      try {
        const result = await cloudinary.uploader.upload(file.upload.tempFilePath, (result) => {
          if (result.public_id) {
            // console.log("THE RESULTS ARE",result,"FILE INFO = ",file)
            //fs.unlinkSync(file.upload.tempFilePath); // delete the emp file.
            fs.rename(file.upload.tempFilePath, file.upload.tempFilePath + ".jpg", () => {
              console.log("file renamed");
            });
            let sql = `UPDATE ${PROJECTS_TABLE_NAME} SET projectName = $1, description = $2, process = $4,challenges = $5, outcomes = $6, status = $7, projectimageurl = $8 WHERE repoID = $3 AND userId = $9;`;
            let values = [
              projectName,
              description,
              repoId,
              process,
              challenges,
              outcomes,
              status,
              file.upload.tempFilePath.replace('client','.')+'.jpg',
              userID,
            ];
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
  let sql = `SELECT * FROM ${PROJECTS_TABLE_NAME} JOIN ${USERS_TABLE_NAME} ON users.id = repoparameters.userid;`;
  db.query(sql)
    .then((results) => {
      console.log(results);
      res.status(200).json(results.rows);
    })
    .catch((err) => {
      res.status(404).json({ message: "Cannot locate repos" });
    });
});

router.get('/:repoid', (req, res) => {
    const repoid = req.params.repoid
    console.log(repoid)
    let sql = `SELECT * FROM ${PROJECTS_TABLE_NAME} JOIN ${USERS_TABLE_NAME} ON users.id = repoparameters.userid WHERE repoparameters.repoid = $1;`
    db.query(sql,[repoid])
    .then(results => {
        // console.log(results)
            res.status(200).json(results.rows)
        })
    .catch(err => {
        res.status(404).json({ message: "Cannot locate repo"})
    })
})
module.exports = router;

