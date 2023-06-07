import { FETCH_PRODUCTS  } from "../actions/productActions";

export const productsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return state = action.payload.data;
    default:
      return state;
  }
}