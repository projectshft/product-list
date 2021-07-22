import { SET_PRICE_SORT_METHOD } from "../actions";

export const priceSortMethodReducer = function (state = "", action) {
  switch (action.type) {
    case SET_PRICE_SORT_METHOD:
      return action.payload;
    default:
      return state;
  }
};
