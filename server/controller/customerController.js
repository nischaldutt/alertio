const customerHandler = require("../services/customerHandler");
const customerValidators = require("../validators/customerValidators");
const CONSTANTS = require("../properties/constants");

module.exports.getBranchInfo = async (req, res, next) => {
  try {
    const customer = {
      customer_username: req.body.params.customer_username,
      pin_code: req.body.params.pin_code.trim(),
    };

    await customerValidators.validateCustomerLogin(customer);

    const servedBranchIds = await customerHandler.getServingBranchIds(customer);
    const branchIds = servedBranchIds.map((branch) => branch.serving_branch_id);

    const servingBranchesInfo = await customerHandler.fetchServingBranchesInfo(
      branchIds
    );

    res
      .status(CONSTANTS.responseFlags.ACTION_COMPLETE)
      .json(servingBranchesInfo);
  } catch (err) {
    res.status(CONSTANTS.responseFlags.ACTION_INCOMPLETE).json(err);
  }
};
