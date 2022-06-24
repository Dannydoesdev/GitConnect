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

  console.log(req.body)
  // githubname: req.session.body.githubname
  // const githubname = req.session.body.githubname;
  const id = req.session.body.id;

  console.log(req.body.username);
  console.log(req.body.reponame)

  // console.log(req.body.githubname);

  // NEED TO PUT THIS SEARCH BEHIND A LOGGED IN USER ONLY
  if (!id) {
    res.status(401).json({ sucess: false, message: "Must be logged in" });
  } else {
    let projectName = req.body.reponame;
    let repoID = Math.floor(Math.random() * 1000);
    let status = 1;

    let sql = `INSERT INTO ${PROJECTS_TABLE_NAME} (userID, gitHubRepoName, repoID, status) VALUES ($1, $2, $3, $4);`;
    let values = [id, projectName, repoID, status];
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

router.post("/editform/", (req, res) => {
//   removing session check for testing purposes

  let sessionId = req.session.id;
  if (!sessionId) {
      res.status(401).json({ sucess: false, message: "Must be logged in" });
  } 
  console.log(req.body,"the request body")
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
    // CLOUDINARY SEcTion. MUST BE FIRST TO GET THE <url></url>
    const file = req.files;
    const mainresponder = res; // increase the scope
    const upload = async (req, res) => {
      try {
        const result = await cloudinary.uploader.upload(file.upload.tempFilePath, (result) => {
          if (result.public_id) {
            fs.rename(file.upload.tempFilePath, file.upload.tempFilePath + ".jpg", () => {
            });
            let  sql =''
            let values = []
            if(file.upload.tempFilePath){
            sql = `UPDATE ${PROJECTS_TABLE_NAME} SET description = $1, process = $3,challenges = $4, outcomes = $5, status = $6, projectimageurl = $7 WHERE repoID = $2 AND userId = $8;`;                                      
            values = [
              description,
              repoId,
              process,
              challenges,
              outcomes,
              status,
              file.upload.tempFilePath.replace('client','.')+'.jpg',
              userID
              ];
            } else {
             let sql = `UPDATE ${PROJECTS_TABLE_NAME} SET description = $1, process = $3,challenges = $4, outcomes = $5, status = $6 WHERE repoID = $2 AND userId = $7;`;                                      
            values = [
              description,
              repoId,
              process,
              challenges,
              outcomes,
              status,
              userID
              ];   
                        
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
  let sql = `SELECT * FROM ${PROJECTS_TABLE_NAME} JOIN ${USERS_TABLE_NAME} ON users.id = repoparameters.userid;`;
  db.query(sql)
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((err) => {
      res.status(404).json({ message: "Cannot locate repos" });
    });
});

router.get('/:repoid', (req, res) => {
    const repoid = req.params.repoid
    let sql = `SELECT * FROM ${PROJECTS_TABLE_NAME} JOIN ${USERS_TABLE_NAME} ON users.id = repoparameters.userid WHERE repoparameters.repoid = $1;`
    db.query(sql,[repoid])
    .then(results => {
            res.status(200).json(results.rows)
        })
    .catch(err => {
        res.status(404).json({ message: "Cannot locate repo"})
    })
})
module.exports = router;

