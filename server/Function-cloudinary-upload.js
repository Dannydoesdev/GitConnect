function uploadImageToRepo(req,res)
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
              theDatabaseMessage = "Database did not update correctly";
              mainresponder.json({ status: STATUS_OK, file: "Uploaded", message: theDatabaseMessage });
            }
          })
          .catch((err) => {
            theDatabaseMessage = "Database did not update correctly";
            mainresponder.json({ status: STATUS_OK, file: "Uploaded", message: theDatabaseMessage });
          });
        try {
          // Delete the tmp file.
          fs.unlinkSync(file.upload.tempFilePath);
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
    });
  } catch (error) {
    console.log(error);
    // mainresponder.json({ status: STATUS_NOT_OK, message: "missing file" });
    return;
  }
  // return;
};

upload();
