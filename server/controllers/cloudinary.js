/*
  The Cloudinary API
  The purpose of this controller is to handle client side image uploading for projects and profiles.
  images are stored on the cloudinary cloud server.
  They can also store video
  PROCESS:
  The client chooses a file on their end to upload to the project.
  This request gets sent to the GitConnect API (here) for processing 
  This controller will authenticate to the cloudinary server and upload the image
  Once image is uploaded it will then store the URL for the image in the repoparameters table

  USAGE: 
    POST request to api/userimages/uploadimage
    PARAMS: repoID, userID, the Image.

  CLIENT:
    A client form can be used to select the image. Then an axios request made to post the form data.
*/
// ****************** CONSTANTS USED IN THIS CONTROLLER ********************************************
const STATUS_NOT_OK = 'not ok'
const STATUS_OK = 'ok'

// ****************** SET UP THE CONTROLLER ********************************************************
const express = require("express");
const router = express.Router();
const fileupload = require("express-fileupload");
const fs = require("fs");
const db = require("../db/db.js");
const cloudinary = require("cloudinary");
require("dotenv").config();
router.use(fileupload({ useTempFiles: true, tempFileDir:"./client/tmp" }));

//  ******************************* CONTROLLER INTERCEPTOR ****************************************
router.use("/", (req, res, next) => {
  // 3 paramaters = middleware
  if (
    !req.path.startsWith("/js/") &&
    !req.path.startsWith("/css/") &&
    !req.path.startsWith("/api/session") &&
    !req.path.startsWith("/img/gclogo.png")
  ) {
    console.log("*************************************************************");
    console.log(`CLOUDINARY CONTROLLER COMMUNICATION ${new Date()} ${req.method}`);
    console.log(`METHOD = ${req.method}`);
    console.log(`PATH = ${req.path}`);
    try {
      console.log(req.files.upload);
    } catch (error) {
      res.json({ message: "no file", status: STATUS_NOT_OK });
    }
    console.log("*************************************************************");
  }
  next();
});

//  *********************************** THE ROUTES *******************************************************
router.post("/uploadimage", (req, res) => {
  /*
    This is where the users project image will be uploaded to cloudinary. The url will be stored in our repo database
    paramaters required are; usersid ('id'), the project id ('projectId') and the picture.

  */
  const userId = req.body.id;
  const projectId = req.body.projectId;
  const file = req.files;
  const mainresponder = res; // increase the scope
  const upload = async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(file.upload.tempFilePath, (result) => {
        if (result.public_id) {
          /*
          Insert the URL to the project
          requirements:
          project/repo id
          repo id
          user id
          image url
          NOTES. Skipping 'sync/await' as its not really required at this point
        */
          sql = "UPDATE repoparameters SET projectImageUrl = $1 WHERE repoID = $2 AND userID = $3";
          values = [result.url, projectId, userId];
          let theDatabaseMessage = "";
          db.query(sql, values)
            .then((dbres) => {
              console.log(dbres);
              if (dbres.rowCount) {
                theDatabaseMessage = "Database updated correctly";
                mainresponder.json({ status: STATUS_OK, file: "Uploaded", message: theDatabaseMessage });
              } else {
                theDatabaseMessage = "Database did not update correctly 1";
                mainresponder.json({ status: STATUS_OK, file: "Uploaded", message: theDatabaseMessage });
              }
            })
            .catch((err) => {
              theDatabaseMessage = "Database did not update correctly 2";
              mainresponder.json({ status: STATUS_OK, file: "Uploaded", message: theDatabaseMessage });
            });
          try {
            // Delete the tmp file.
            //fs.unlinkSync(file.upload.tempFilePath);
            // temporary file removed
            return result;
          } catch (err) {
            console.error(err);
            mainresponder.json({
              status: STATUS_NOT_OK,
              message: "file wasnt deleted from the temp folder",
              error: err,
            });
          }
        }
        return result;
      })
    } catch (error) {
      console.log(error)
      // mainresponder.json({ status: STATUS_NOT_OK, message: "missing file" });
      return;
    };
    // return;
  };

    upload();

 
});
module.exports = router;
