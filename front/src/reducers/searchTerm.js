import { SET_SEARCH_TERM } from "../actions";

export const searchTermReducer = function (state = "", action) {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.payload;
    default:
      return state;
  }
};
