import {
  SAVE_ADMIN,
  SAVE_CUSTOMER,
  GET_ALL_BRANCHES,
  ERROR_OCCURRED,
  GET_BRANCH_INFO,
  SAVE_ALERTS_IN_STORE,
  GET_REALTIME_ALERT,
} from "../actions/types";

export const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_ADMIN:
      return action.payload;
    default:
      return state;
  }
};

export const customerReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_CUSTOMER:
      return action.payload;
    default:
      return state;
  }
};

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

export const branchInfoReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BRANCH_INFO: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const alertReducer = (state = [], action) => {
  switch (action.type) {
    case SAVE_ALERTS_IN_STORE:
      return action.payload;
    case GET_REALTIME_ALERT:
      return [action.payload, ...state];
    default:
      return state;
  }
};
