import backend from "../api";

import createBrowserHistory from "../history";

import {
  TOGGLE_THEME,
  LOGGED_IN,
  SAVE_ADMIN,
  SET_BRANCHES,
  GET_BRANCH_INFO,
  SAVE_ALERTS_IN_STORE,
  GET_REALTIME_ALERT,
  SET_ROOM,
  SET_ERROR,
  MARK_ALERT_AS_READ,
  SAVE_CUSTOMER,
} from "./types";

export const toggleTheme = () => {
  return {
    type: TOGGLE_THEME,
  };
};

export const setRoom = (room) => {
  return {
    type: SET_ROOM,
    payload: room,
  };
};

export const emptyErrorObject = () => {
  return {
    type: SET_ERROR,
    payload: null,
  };
};

export const adminRegister =
  ({ admin_name, admin_email, admin_password }) =>
  async (dispatch, getState) => {
    try {
      const response = await backend.post(
        "/admin/register",
        {
          admin_name,
          admin_email,
          admin_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      // console.log(err.response.data);
      return dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    }
  };

export const adminLogin =
  ({ admin_email, admin_password }) =>
  async (dispatch, getState) => {
    try {
      const response = await backend.post(
        "/admin/login",
        {
          admin_email,
          admin_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { refreshToken, accessToken, adminId } = response.data.data;
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);
      const adminInStore = { adminId, admin_email };

      dispatch({
        type: LOGGED_IN,
        payload: true,
      });

      dispatch({
        type: SAVE_ADMIN,
        payload: adminInStore,
      });

      createBrowserHistory.push("/admin/branches");
      return;
    } catch (err) {
      // console.log(err.response.data);
      return dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    }
  };

export const checkIfAdminLoggedIn = () => async (dispatch, getState) => {
  try {
    const response = await backend.get("/admin/login");
    // console.log(response);
    if (response.data.loggedIn) {
      dispatch({
        type: LOGGED_IN,
        payload: true,
      });

      dispatch({
        type: SAVE_ADMIN,
        payload: response.data.user,
      });

      createBrowserHistory.push("/admin/branches");
      return;
    } else {
      dispatch({
        type: LOGGED_IN,
        payload: false,
      });

      dispatch({
        type: SAVE_ADMIN,
        payload: {},
      });

      dispatch({
        type: SET_BRANCHES,
        payload: [],
      });

      dispatch({
        type: SAVE_ALERTS_IN_STORE,
        payload: [],
      });

      dispatch({
        type: SET_ROOM,
        payload: "",
      });
      createBrowserHistory.push("/admin");
      return;
    }
  } catch (err) {
    // console.log(err.response);
    return dispatch({
      type: SET_ERROR,
      payload: err.response.data,
    });
  }
};

export const adminLogout = () => async (dispatch, getState) => {
  try {
    const { accessToken, refreshToken } = localStorage;

    await backend.post(
      "/admin/logout",
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch({
      type: LOGGED_IN,
      payload: false,
    });

    dispatch({
      type: SAVE_ADMIN,
      payload: {},
    });

    dispatch({
      type: SET_BRANCHES,
      payload: [],
    });

    dispatch({
      type: SAVE_ALERTS_IN_STORE,
      payload: [],
    });

    dispatch({
      type: SET_ROOM,
      payload: "",
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    createBrowserHistory.push("/admin");
    return;
  } catch (err) {
    // console.log(err.response.data);
    return dispatch({
      type: SET_ERROR,
      payload: err.response.data,
    });
  }
};

export const fetchAllBranches =
  ({ branch_username, branch_password }) =>
  async (dispatch, getState) => {
    try {
      const { accessToken } = localStorage;

      const branchLoginResponse = await backend.post(
        "/branch/login",
        {
          branch_username,
          branch_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // console.log({ branchLoginResponse });

      if (branchLoginResponse.status === 200) {
        const branches = await backend.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // console.log({ branches });

        return dispatch({
          type: SET_BRANCHES,
          payload: branches.data,
        });
      }
    } catch (err) {
      // console.log(err.response.data);
      return dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    }
  };

export const markAlertAsRead = ({ alert_id }) => {
  return {
    type: MARK_ALERT_AS_READ,
    payload: alert_id,
  };
};

export const fetchBranchInfo =
  ({ customer_username, pin_code }) =>
  async (dispatch, getState) => {
    try {
      const response = await backend.get("/customer/get_branch_info", {
        params: {
          customer_username,
          pin_code,
        },
      });
      // console.log("response ===> ", response);
      return dispatch({
        type: GET_BRANCH_INFO,
        payload: response.data,
      });
    } catch (err) {
      // console.log("error ===> ", err.response);
      return dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    }
  };

export const saveAlertsInStore = (alerts) => {
  return {
    type: SAVE_ALERTS_IN_STORE,
    payload: alerts,
  };
};

export const saveRealTimeAlertInStore = (alertObj) => {
  return {
    type: GET_REALTIME_ALERT,
    payload: alertObj,
  };
};

export const saveCustomer = (customer) => {
  return {
    type: SAVE_CUSTOMER,
    payload: customer,
  };
};
