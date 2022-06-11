require("dotenv").config();
const pg = require("pg"); // Database access module
const db = new pg.Pool({ database: process.env.DATABASE });


module.exports = db