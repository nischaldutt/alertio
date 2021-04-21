import { combineReducers } from "redux";

import {
  branchesReducer,
  errorReducer,
  branchInfoReducer,
  alertReducer,
  realTimeAlertReducer,
} from "./alertioReducers";

export default combineReducers({
  branches: branchesReducer,
  error: errorReducer,
  branchInfo: branchInfoReducer,
  alerts: alertReducer,
  realTimeAlert: realTimeAlertReducer,
});
