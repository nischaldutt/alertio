const Promise = require("bluebird");

const connection = require("../database/mysql");
const customerUtilities = require("../utilities/customerUtilities");

module.exports.getServingBranchIds = ({ pin_code }) => {
  const query = `SELECT serving_branch_id FROM pin_codes WHERE pin_code='${pin_code}';`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err || !result.length
        ? reject(
            customerUtilities.actionInComplete({
              err,
              message: "Please enter valid pin code.",
            })
          )
        : resolve(result);
    });
  });
};

module.exports.fetchServingBranchesInfo = (branchIdsArray) => {
  const query = `SELECT 
    branches.branch_id,
    branches.branch_name,
    branches.branch_address,
    branches.branch_incharge_name,
    institutes.institute_name,
    cities.city_name
      FROM
          branches
              INNER JOIN
          institutes
              INNER JOIN
          cities
      WHERE
    branches.branch_id IN ( ${branchIdsArray} )
        AND institutes.institute_id = branches.institution_id
        AND cities.city_id = branches.city_id`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err || !result.length
        ? reject(
            customerUtilities.actionInComplete({
              err,
              message: "Branch information not present.",
            })
          )
        : resolve(result);
    });
  });
};
