import { combineReducers } from "redux";

import { toggleThemeReducer } from "./themeReducer";
import {
  adminReducer,
  customerReducer,
  branchesReducer,
  errorReducer,
  branchInfoReducer,
  alertReducer,
} from "./alertioReducers";

export default combineReducers({
  darkTheme: toggleThemeReducer,
  admin: adminReducer,
  customer: customerReducer,
  branches: branchesReducer,
  error: errorReducer,
  branchInfo: branchInfoReducer,
  alerts: alertReducer,
});
