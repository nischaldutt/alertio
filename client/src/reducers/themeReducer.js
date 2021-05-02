import { TOGGLE_THEME } from "../actions/types";

export const toggleThemeReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return !state;
    default:
      return state;
  }
};
