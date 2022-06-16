require("dotenv").config();
const pg = require("pg"); // Database access module
let db; //= new pg.Pool({ database: process.env.DATABASE });
if (process.env.NODE_ENV === "production") {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new pg.Pool({
    database: "project3_db",
    password: "optional_password", // If you have a password on your local db
  });
}

module.exports = db;