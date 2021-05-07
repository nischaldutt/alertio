const Promise = require("bluebird");
const connection = require("../database/mysql");

module.exports.saveAlerts = ({ alertObj, timestamp, branchIds }) => {
  const query = `INSERT INTO alerts (alert, timestamp, associated_branch_id, is_read) VALUES ?`;
  const values = branchIds.map((id) => [
    JSON.stringify(alertObj),
    timestamp,
    id,
    0,
  ]);
  console.log(values);
  return new Promise((resolve, reject) => {
    connection.query(query, [values], (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

module.exports.fetchAlerts = ({ branch_id }) => {
  const query = `SELECT alert_id, alert, timestamp, is_read FROM alerts WHERE associated_branch_id='${branch_id}' ORDER BY alert_id DESC;`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

module.exports.getBranchUsernames = ({ branchIds }) => {
  const query = `SELECT branch_id, username FROM branches WHERE branch_id IN ( ${branchIds} );`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

module.exports.setAlertStatusRead = ({ alert_id }) => {
  const query = `UPDATE alerts SET is_read = 1 WHERE alert_id = '${alert_id}';`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};
