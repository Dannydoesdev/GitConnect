/* SERVER  
    APPLICATION TITLE: 
    GROUP:   
    DATE:   
    DESCRIPTION:*/
// ********************************************************************************************************************
// SET UP THE INCLUDES
require("dotenv").config();
//commented out for now - was causing an error with something I was doing - Danny

// const { exit } = require("process");

const express = require("express");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const percentRound = require("percent-round");
const db = require("./server/db/db");
const bodyParser = require('body-parser');
// ********************************************************************************************************************
// CONSTANTS
const appSecretKey = process.env.EXPRESS_SESSION_SECRET_KEY;
const PORT = process.env.PORT || 3000;
const app = express(); // Initialise the app
// ********************************************************************************************************************
// SET UP THE APP

app.use("/", (req, res, next) => {
  // 3 paramaters = middleware
  if (
    !req.path.startsWith("/js/") &&
    !req.path.startsWith("/css/") &&
    !req.path.startsWith("/api/session") &&
    !req.path.startsWith("/img/gclogo.png")
  ) {
    console.log("*************************************************************");
    console.log(`SERVER COMMUNICATION ${new Date()} ${req.method}`);
    console.log(`METHOD = ${req.method}`);
    console.log(`PATH = ${req.path}`);
    console.log(`PARAMETERS = `);
    console.log(req.body);
    console.log(req.session);
    console.log("*************************************************************");
  }
    next();  
});
app.use((err, req, res, next) => {
  // 4 parameters = error handeler
  console.log(`I am ERROR middleware ${new Date()} ${req.method} ${req.path}`);
  console.log(err);
  res.status(500).json({ message: "Unknown SERVER/INSERT error occurred" });
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client")); // to use the 'client' folder to serve the home html
app.use(express.json());
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: appSecretKey,
    cookie: { maxAge: 2000000 },
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
  })
);
const usersController = require("./server/controllers/users");
const sessionController = require("./server/controllers/sessions");
const gitHubController = require("./server/controllers/github");
const projectController = require("./server/controllers/projects");
const profileController = require("./server/controllers/profiles");
const cloudinaryController = require("./server/controllers/cloudinary");

app.use("/api/users", usersController);
app.use("/api/session", sessionController);
app.use("/api/gitConnect", gitHubController);
app.use("/api/projects", projectController);
app.use("/api/profiles", profileController);
app.use("/api/userimages", cloudinaryController);
// ********************************************************************************************************************
// DEVELOPER comms
if (process.env.DATABASE) {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
  console.log(`DATABASE ONLINE: ${process.env.DATABASE}`);
} else {
  console.log(
    "No Database has been setup. Go to the .env file and place the database name"
  );
}

