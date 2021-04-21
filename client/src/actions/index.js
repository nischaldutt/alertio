import backend from "../api";
import createBrowserHistory from "../history";
import {
  GET_ALL_BRANCHES,
  ERROR_OCCURRED,
  GET_BRANCH_INFO,
  SAVE_ALERTS_IN_STORE,
  GET_REALTIME_ALERT,
} from "./types";

export const fetchAllBranches = ({
  admin_name,
  branch_username,
  branch_password,
}) => async (dispatch, getState) => {
  try {
    const response = await backend.post("/admin/login", {
      params: {
        admin_name,
        branch_username,
        branch_password,
      },
    });
    dispatch({
      type: GET_ALL_BRANCHES,
      payload: response.data,
    });

    createBrowserHistory.push("/admin/dashboard");
  } catch (err) {
    dispatch({
      type: ERROR_OCCURRED,
      payload: err.response.data,
    });
  }
};

export const fetchBranchInfo = ({ customer_username, pin_code }) => async (
  dispatch,
  getState
) => {
  try {
    const response = await backend.post("/customer/get_branch_info", {
      params: {
        customer_username,
        pin_code,
      },
    });
    dispatch({
      type: GET_BRANCH_INFO,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_OCCURRED,
      payload: err.response.data,
    });
  }
};

export const saveAlertsInStore = (alerts) => {
  console.log("saving alerts in store");
  console.log(alerts);
  return {
    type: SAVE_ALERTS_IN_STORE,
    payload: alerts,
  };
};

export const saveAlertObjInStore = (alertObj) => {
  return {
    type: GET_REALTIME_ALERT,
    payload: alertObj,
  };
};
