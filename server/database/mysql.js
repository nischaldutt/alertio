const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "nischal",
  password: "root",
  database: "alertio",
  multipleStatements: true,
});

connection.connect((err) => {
  err ? console.log(err) : console.log("Mysql database connected.");
});

module.exports = connection;
