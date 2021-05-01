const customerHandler = require("../services/customerHandler");
const customerValidators = require("../validators/customerValidators");
const CONSTANTS = require("../properties/constants");

module.exports.getBranchInfo = async (req, res, next) => {
  try {
    const customer = {
      customer_username: req.query.customer_username,
      pin_code: req.query.pin_code.trim(),
    };

    await customerValidators.validateCustomerLogin(customer);
    // get branchIds that serve at pin_code entered
    const servedBranchIds = await customerHandler.getServingBranchIds(customer);
    const branchIds = servedBranchIds.map((branch) => branch.serving_branch_id);
    console.log({ branchIds });
    // get info related to served branches
    const servingBranchesInfo = await customerHandler.fetchServingBranchesInfo(
      branchIds
    );
    console.log({ servingBranchesInfo });
    res
      .status(CONSTANTS.responseFlags.ACTION_COMPLETE)
      .json(servingBranchesInfo);
  } catch (err) {
    console.log({ err });
    res.status(CONSTANTS.responseFlags.ACTION_INCOMPLETE).json(err);
  }
};
