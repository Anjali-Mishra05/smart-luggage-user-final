const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "smart_luggage"
});

db.connect((err) => {
    if(err) console.log("DB Connection Error:", err);
    else console.log("DB Connected");
});

module.exports = db;