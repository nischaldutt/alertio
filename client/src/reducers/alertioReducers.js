import {
  LOGGED_IN,
  SAVE_ADMIN,
  SAVE_CUSTOMER,
  SET_BRANCHES,
  GET_BRANCH_INFO,
  SAVE_ALERTS_IN_STORE,
  GET_REALTIME_ALERT,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_ROOM,
  SET_ERROR,
  MARK_ALERT_AS_READ,
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
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
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

export const errorReducer = (state = null, action) => {
  switch (action.type) {
    case SET_ERROR: {
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
      if (state.length > 0 && action.payload.alert_id === state[0].alert_id) {
        return state;
      } else {
        return [action.payload, ...state];
      }
    case MARK_ALERT_AS_READ: {
      return state.map((alert) => {
        if (alert.alert_id === action.payload) {
          alert.is_read = 1;
        }
        return alert;
      });
    }
    default:
      return state;
  }
};

export const roomReducer = (state = "", action) => {
  switch (action.type) {
    case SET_ROOM:
      return action.payload;
    default:
      return state;
  }
};
