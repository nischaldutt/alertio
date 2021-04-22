import { combineReducers } from "redux";

import {
  branchesReducer,
  errorReducer,
  branchInfoReducer,
  alertReducer,
  realTimeAlertsReducer,
} from "./alertioReducers";

export default combineReducers({
  branches: branchesReducer,
  error: errorReducer,
  branchInfo: branchInfoReducer,
  alerts: alertReducer,
  realTimeAlerts: realTimeAlertsReducer,
});
