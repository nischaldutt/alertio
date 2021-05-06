import { combineReducers } from "redux";

import { toggleThemeReducer } from "./themeReducer";
import {
  saveAdminReducer,
  adminLoginReducer,
  customerReducer,
  branchesReducer,
  errorReducer,
  branchInfoReducer,
  alertReducer,
  roomReducer,
} from "./alertioReducers";

export default combineReducers({
  darkTheme: toggleThemeReducer,
  loggedIn: adminLoginReducer,
  // tokens: tokensReducer,
  admin: saveAdminReducer,
  room: roomReducer,
  customer: customerReducer,
  branches: branchesReducer,
  error: errorReducer,
  branchInfo: branchInfoReducer,
  alerts: alertReducer,
});
