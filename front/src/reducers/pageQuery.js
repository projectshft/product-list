import { SET_PAGE_QUERY } from "../actions";

export const pageQueryReducer = function (state = 1, action) {
  switch (action.type) {
    case SET_PAGE_QUERY:
      return action.payload;
    default:
      return state;
  }
};
