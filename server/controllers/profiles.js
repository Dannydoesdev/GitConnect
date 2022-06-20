const express = require("express");
const db = require("../db/db.js");
const router = express.Router();
const BAD_CREDENTIALS = "BAD CREDENTIALS"
const BAD_CREDENTIALS_STATUS = 403
const USERS_TABLE_NAME = "users"
const PROFILES_TABLE_NAME = "repoParameters"

//Handle POST requests to /api/projects to create profiles
router.post("/", (req, res) => {
    
    // removing session check for testing purposes

    // let sessionId = req.session.id;
    // if (!sessionId) {
    //     res.status(401).json({ sucess: false, message: "Must be logged in" });
    // } else {

    
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let aboutme = req.body.aboutme;

        //should change this to allow any data to be updated without blocking the request
        if (!firstName) {
            res.status(400).json({ sucess: false, message: "Please provide a first name" });
        } else if (!lastName) {
            res.status(400).json({ sucess: false, message: "Please provide a last name" });
        } else if (!aboutme) {
            res.status(400).json({ sucess: false, message: "Please enter some details in 'about me'" });
        } 
        else {
            // testing manual insertion of some info
            let userID = 2;
            
            let sql = `UPDATE ${USERS_TABLE_NAME} SET firstName = $1, lastName = $2, aboutme = $3 WHERE id = $4`;
            let values = [firstName, lastName, aboutme, userID];
            console.log(values);
            
            db.query(sql, values)
                .then(dbres => {
                    console.log('profile created')
                    res.json({ sucess: true, message: "Profile created" });
                })
                .catch(reason => {
                    console.log(reason)
                    res.status(500).json({ sucess: false, message: 'Unknown error occured' });
                })

        }
    // }
}); 



module.exports = router;