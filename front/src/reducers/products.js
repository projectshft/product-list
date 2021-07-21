import { FETCH_PRODUCTS } from "../actions";

export const productReducer = function (state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
};
