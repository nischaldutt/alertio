import { GET_ALL_BRANCHES, ERROR_OCCURRED } from "../actions/types";

export const branchesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_BRANCHES:
      return action.payload;
    default:
      return state;
  }
};

export const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case ERROR_OCCURRED: {
      return action.payload;
    }
    default:
      return state;
  }
};
