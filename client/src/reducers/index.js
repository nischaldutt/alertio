import { combineReducers } from "redux";

import {
  branchesReducer,
  errorReducer,
  branchInfoReducer,
  alertReducer,
} from "./alertioReducers";

export default combineReducers({
  branches: branchesReducer,
  error: errorReducer,
  branchInfo: branchInfoReducer,
  alerts: alertReducer,
});
