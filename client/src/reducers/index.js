import { combineReducers } from "redux";

import { branchesReducer, errorReducer } from "./alertioReducers";

export default combineReducers({
  branches: branchesReducer,
  error: errorReducer,
});
