const express = require("express");
const db = require("../db/db.js");
const router = express.Router();
const BAD_CREDENTIALS = "BAD CREDENTIALS"
const BAD_CREDENTIALS_STATUS = 403
const USERS_TABLE_NAME = "users"
const PROJECTS_TABLE_NAME = "repoParameters"


//Handle POST requests to /api/projects to create project after searching repos
router.post("/addRepo", (req, res) => {
    // githubname: req.session.body.githubname
    const githubname = req.session.body.githubname
    const id = req.session.body.id
    console.log(req.body.githubname)
    // NEED TO PUT THIS SEARCH BEHIND A LOGGED IN USER ONLY
    if (!id) {
        res.status(401).json({ sucess: false, message: "Must be logged in" });
    } else {  
        let projectName = req.body.reponame;
        console.log(projectName)
        // DONT THINK WE NEED repoID - or can be a serial primary key
        let repoID = Math.floor(Math.random() * 1000);
        let status = 1;
        console.log(id);
        let sql = `INSERT INTO ${PROJECTS_TABLE_NAME} (userID, gitHubRepoName, repoID, status) VALUES ($1, $2, $3, $4);`;
        let values = [id, projectName, repoID, status];
        console.log(values);
        db.query(sql, values)
        .then(dbres => {
            console.log('project created')
            res.json({ sucess: true, message: "Project created" });
        }
    )
        .catch(reason => {
            console.log(reason)
            res.status(500).json({ sucess: false, message: 'Unknown error occured' });
        })
    }
})



//Handle POST requests to /api/projects/editform to allow users to add custom info to project via edit form
router.post("/editform/:projectid", (req, res) => {
    
    // removing session check for testing purposes

    // let sessionId = req.session.id;
    // if (!sessionId) {
    //     res.status(401).json({ sucess: false, message: "Must be logged in" });
    // } else {

        let projectName = req.body.projectName;
        let description = req.body.description;
        let process = req.body.process;
        let challenges = req.body.challenges;
        let outcomes = req.body.outcomes;
        let status = req.body.status;

        if (!projectName) {
            res.status(400).json({ sucess: false, message: "Please provide a project name" });
        } else if (!description) {
            res.status(400).json({ sucess: false, message: "Please provide a project description" });
        } else if (!process) {
            res.status(400).json({ sucess: false, message: "Please enter details about the process of the project" });
        } else if (!challenges) {
            res.status(400).json({ sucess: false, message: "Please enter details about challenges you faced" });
        } else if (!outcomes) {
            res.status(400).json({ sucess: false, message: "Please enter details about the project outcomes" });
        }
        else {
            // testing manual insertion of some info
            let gitHubRepoName = 'flyre'
            let userID = 1;
            let repoID = Math.floor(Math.random() * 100);
            // let status = 1;
            

            // NOTE UPDATE THIS TO BE AN UPDATE STATEMENT WHEN THE PROJECT CREATION IS WORKING
            let sql = `INSERT INTO ${PROJECTS_TABLE_NAME} (projectName, description, process, challenges, outcomes, status, userID, gitHubRepoName, repoID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
            let values = [projectName, description, process, challenges, outcomes, status, userID, gitHubRepoName, repoID];
            console.log(values);
            db.query(sql, values)
                .then(dbres => {
                    console.log('project created')
                    res.json({ sucess: true, message: "Project created" });
                }
            )
                .catch(reason => {
                    console.log(reason)
                    res.status(500).json({ sucess: false, message: 'Unknown error occured' });
                })

        }
    // }
}); 


module.exports = router;