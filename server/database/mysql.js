const mysql = require("mysql");

const mysqlConfig = {
  connectionLimit: 100,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
};

const connection = mysql.createPool(mysqlConfig);

// const handleDisconnect = () => {
//   connection = mysql.createPool(mysqlConfig);

//   connection.connect((err) => {
//     err
//       ? (console.log("Error while connecting to mysql ==> ", err),
//         setTimeout(handleDisconnect, 2000))
//       : console.log("Mysql database connected.");
//   });

//   connection.on("error", function (err) {
//     console.log("db error", err);
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       handleDisconnect();
//     } else {
//       throw err;
//     }
//   });
// };

// handleDisconnect();

module.exports = connection;
