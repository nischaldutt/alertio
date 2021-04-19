import backend from "../api";
import createBrowserHistory from "../history";
import { GET_ALL_BRANCHES, ERROR_OCCURRED } from "./types";

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
