import { combineReducers } from "redux";

import {
  adminReducer,
  customerReducer,
  branchesReducer,
  errorReducer,
  branchInfoReducer,
  alertReducer,
} from "./alertioReducers";

export default combineReducers({
  admin: adminReducer,
  customer: customerReducer,
  branches: branchesReducer,
  error: errorReducer,
  branchInfo: branchInfoReducer,
  alerts: alertReducer,
});
