const express = require("express");
const db = require("../db/db.js");
const router = express.Router();
const BAD_CREDENTIALS = "BAD CREDENTIALS"
const BAD_CREDENTIALS_STATUS = 403
const USERS_TABLE_NAME = "users"
const PROJECTS_TABLE_NAME = "repoParameters"

//Handle POST requests to /api/projects to create profiles
router.post("/:userid", (req, res) => {
    
    let userid = req.params.userid
    let loggedInUserid = req.session.body.id;
    // removing session check for testing purposes
    console.log("THE USERID IS", userid);
    console.log("THE LOGGED IN USERID IS", loggedInUserid);

    if (userid != loggedInUserid) {
        res.status(400).json({ sucess: false, message: "You can only edit your own profile" });
    } else {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let aboutme = req.body.aboutme;
        let location = req.body.location;
        let portfoliolink = req.body.portfoliolink;

        //should change this to allow any data to be updated without blocking the request
        if (!firstName) {
            res.status(400).json({ sucess: false, message: "Please provide a first name" });
        } else if (!lastName) {
            res.status(400).json({ sucess: false, message: "Please provide a last name" });
        } else if (!aboutme) {
            res.status(400).json({ sucess: false, message: "Please enter some details in 'about me'" });
        }
        else {
            let sql = `UPDATE ${USERS_TABLE_NAME} SET firstName = $1, lastName = $2, aboutme = $3 WHERE id = $4;`;
            let values = [firstName, lastName, aboutme, userid];
            db.query(sql, values)
                .then(dbres => {
                    console.log('Profile updated')
                    // res.json({ sucess: true, message: "Profile created" });
                })
                .then(() => {
                    if (portfoliolink) {
                        db.query(`UPDATE ${USERS_TABLE_NAME} SET portfoliolink = $1 WHERE id = $2;`, [portfoliolink, userid])
                            .then(dbres => {
                                console.log('portfolio added')
                                // res.json({ sucess: true, message: "Profile created" });
                            })
                    }
                })
                .then(() => {
                    if (location) {
                        db.query(`UPDATE ${USERS_TABLE_NAME} SET gitHubLocation = $1 WHERE id = $2;`, [location, userid])
                            .then(dbres => {
                                console.log('location added')
                                res.json({ sucess: true, message: "Profile updated" });
                            })
                    }
                    else {res.json({ sucess: true, message: "Profile updated" });}
                })
                .catch(reason => {
                    console.log(reason)
                    res.status(500).json({ sucess: false, message: 'Unknown error occured' });
                })
              
                    

        }
    }
}); 

// WILL NEED TO BE ABLE TO do this anonymously (IE JUST A BROWSING USER - can split to another call maybe)
router.get("/profilepage/:id", (req, res) => {
    console.log(req.params.id)
    let userName = req.params.userName;
    let id = req.params.id;
    // const loggedinUserName = req.session.body.githubname;
    let loggedInUserId
    
    if (!('body'in req.session)) {
            loggedInUserId = null;
        } else {
            loggedInUserId = req.session.body.id;
        }

    let profileObject = {};

    let sql = `SELECT * FROM ${USERS_TABLE_NAME} WHERE id = $1;`;
    let values = [id];

    if (id == loggedInUserId) {
        console.log("logged in user")
        profileObject.currentUser = true;
    }
    db.query(sql, values)
        .then(dbres => {
            profileObject.user = dbres.rows[0];
            // console.log('user call =' + profileObject.user)
            // res.json(dbres.rows);
        })
        .then(() => {
            sql = `SELECT * FROM ${PROJECTS_TABLE_NAME} WHERE userID = $1 and status ='1';`;
            values = [id];

            db.query(sql, values)
                .then(dbres => {
                    // console.log(dbres.rows);
                    profileObject.projects = dbres.rows;
                    // console.log(profileObject);
                    // res.json(dbres.rows);
                    // console.log('project call' + profileObject.projects)
                    // console.log(profileObject)
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