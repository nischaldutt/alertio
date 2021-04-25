const Promise = require("bluebird");

const connection = require("../database/mysql");

module.exports.saveJwtToken = ({
  table,
  updateColumn,
  updateColumnValue,
  filterColumn,
  filterColumnValue,
}) => {
  const query = `UPDATE ${table} SET ${updateColumn}='${updateColumnValue}' WHERE ${filterColumn}=${filterColumnValue};`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};
