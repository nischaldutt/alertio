import {
  LOGGED_IN,
  SAVE_ADMIN,
  SAVE_CUSTOMER,
  SET_BRANCHES,
  ERROR_OCCURRED,
  GET_BRANCH_INFO,
  SAVE_ALERTS_IN_STORE,
  GET_REALTIME_ALERT,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
} from "../actions/types";

export const tokensReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        accessToken: action.payload,
        ...state,
      };
    case SET_REFRESH_TOKEN:
      return {
        refreshToken: action.payload,
        ...state,
      };
    default:
      return state;
  }
};

export const adminLoginReducer = (state = false, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return action.payload;
    default:
      return state;
  }
};

export const saveAdminReducer = (state = {}, action) => {
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
    case SET_BRANCHES:
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
