const Promise = require("bluebird");

const bcrypt = require("../libs/brcypt");
const connection = require("../database/mysql");
const adminUtilities = require("../utilities/adminUtilities");

module.exports.getBranchNames = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT branch_id, branch_name FROM branches",
      (err, result) => {
        err
          ? reject(adminUtilities.userNamesNotGenerated(err))
          : resolve(adminUtilities.userNamesGenerated(result));
      }
    );
  });
};

module.exports.pushBranchNames = (branches) => {
  let query = "";
  branches.map((branch) => {
    query += `UPDATE branches SET username = '${branch[0]}' WHERE branch_id = '${branch[1]}';`;
  });
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err
        ? reject(adminUtilities.userNamesNotGenerated(err))
        : resolve(adminUtilities.userNamesGenerated(result));
    });
  });
};

module.exports.getAllBranches = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT branch_id, branch_name, branch_address, branch_incharge_name, username FROM branches`,
      (err, result) => {
        err
          ? reject(adminUtilities.passwordsNotGenerated(err))
          : resolve(adminUtilities.passwordsGenerated(result));
      }
    );
  });
};

module.exports.pushPasswords = (hash) => {
  const query = `UPDATE branches SET password = '${hash}';`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err
        ? reject(adminUtilities.passwordsNotGenerated(err))
        : resolve(adminUtilities.passwordsGenerated(result));
    });
  });
};

module.exports.isAdminRegistered = ({ admin_email }) => {
  const query = `SELECT admin_email FROM admins WHERE admin_email = '${admin_email}';`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err ? reject(err) : result.length ? resolve(true) : resolve(false);
    });
  });
};

module.exports.getAdminId = ({ admin_email }) => {
  const query = `SELECT admin_id FROM admins WHERE admin_email = '${admin_email}';`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err
        ? reject(err)
        : result.length
        ? resolve(result[0].admin_id)
        : reject(adminUtilities.adminNotRegistered({ admin_email }));
    });
  });
};

module.exports.saveAdminDetails = (admin) => {
  const query = `INSERT INTO admins SET ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, admin, (err, result) => {
      err
        ? reject(err)
        : resolve(
            adminUtilities.adminRegistered({ admin_name: admin.admin_name })
          );
    });
  });
};

module.exports.isUsernameCorrect = (username) => {
  const query = `SELECT username FROM branches WHERE username = '${username}';`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err || !result.length
        ? reject(adminUtilities.usernameInvalid(username))
        : resolve(adminUtilities.usernameValid(username));
    });
  });
};

module.exports.getPasswordHash = ({
  table,
  selectColumn,
  filterColumn,
  filterColumnValue,
}) => {
  const query = `SELECT ${selectColumn} FROM ${table} WHERE ${filterColumn} = '${filterColumnValue}';`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err ? reject(err) : resolve(result[0][selectColumn]);
    });
  });
};

module.exports.getBranchData = () => {
  const query = `SELECT * FROM branches`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err
        ? reject(adminUtilities.branchesNotReceived(err))
        : resolve(adminUtilities.receivedBranches(result));
    });
  });
};

module.exports.fetchBranchInfo = (mappingIds) => {
  // console.log(mappingIds);
  let instituteIds = [];
  let cityIds = [];
  let branchIds = [];

  mappingIds.map((obj) => {
    branchIds.push([obj.branch_id]);
    instituteIds.push([obj.institute_id]);
    cityIds.push([obj.city_id]);
  });

  // console.log([instituteIds, cityIds, branchIds]);

  const getInstitutions = `SELECT institute_name FROM institutes WHERE institute_id = ?;`;
  const getCities = `SELECT city_name FROM cities WHERE city_id = ?;`;
  const getContacts = `SELECT contact_number, branch_id FROM contacts;`;
  const getPinCodes = `SELECT pin_code, serving_branch_id FROM pin_codes;`;

  const query = getInstitutions + getCities + getContacts + getPinCodes;

  return new Promise((resolve, reject) => {
    connection.query(query, [instituteIds, cityIds].flat(1), (err, result) => {
      err || !result.length
        ? reject(adminUtilities.issueWhileFetchingBranchInfo(err))
        : resolve(adminUtilities.branchInfoReceived(result));
    });
  });
};

module.exports.getBranchId = ({ username }) => {
  const query = `SELECT branch_id FROM branches WHERE username='${username}';`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      err ? reject(err) : resolve(result[0]);
    });
  });
};
