import { FETCH_PRODUCT } from "../actions";

// FETCH_PRODUCT will be 9 products
const ProductReducer = function (state = [], action) {
  //console.log(action.payload.data[0].prod);
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.payload.data[0];
    default:
      return state;
}};

export default ProductReducer;