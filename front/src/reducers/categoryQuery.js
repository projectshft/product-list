import { SET_CATEGORY_QUERY } from "../actions";

export const categoryQueryReducer = function (state = "", action) {
  switch (action.type) {
    case SET_CATEGORY_QUERY:
      return action.payload;
    default:
      return state;
  }
};
