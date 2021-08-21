import { FETCH_PRODUCT } from "../actions";

// FETCH_PRODUCT will be 9 products
const ProductReducer = function (state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.payload.data;
    default:
      return state;
}};

export default ProductReducer;