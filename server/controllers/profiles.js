const express = require("express");
const db = require("../db/db.js");
const router = express.Router();
const BAD_CREDENTIALS = "BAD CREDENTIALS"
const BAD_CREDENTIALS_STATUS = 403
const USERS_TABLE_NAME = "users"
const PROJECTS_TABLE_NAME = "repoParameters"

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
            
            let sql = `UPDATE ${USERS_TABLE_NAME} SET firstName = $1, lastName = $2, aboutme = $3 WHERE id = $4;`;
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

// WILL NEED TO BE ABLE TO do this anonymously (IE JUST A BROWSING USER - can split to another call maybe)
router.get("/profilepage/:userName", (req, res) => {
    console.log(req.params.userName)
    let userName = req.params.userName;
    const loggedinUserName = req.session.body.githubname;
    const id = req.session.body.id;
    console.log(userName + id)

    // Need to keep track of info from both project and profiles table
    let profileObject = {};

    let sql = `SELECT * FROM ${USERS_TABLE_NAME} WHERE githubname = $1;`;
    let values = [userName];

    if (userName === loggedinUserName) {
        console.log("logged in user")
        profileObject.currentUser = true;
    }
    db.query(sql, values)
        .then(dbres => {
            profileObject.user = dbres.rows[0];
            // res.json(dbres.rows);
        })
        .then(() => {
            sql = `SELECT * FROM ${PROJECTS_TABLE_NAME} WHERE userID = $1;`;
            values = [id];

            db.query(sql, values)
                .then(dbres => {
                    // console.log(dbres.rows);
                    profileObject.projects = dbres.rows;
                    // console.log(profileObject);
                    // res.json(dbres.rows);
                    res.json(profileObject);
                })
                    
                .catch(reason => {
                    console.log(reason)
                    res.status(500).json({ sucess: false, message: 'Unknown error occured' });
                }
                )
        })
});


    

module.exports = router;