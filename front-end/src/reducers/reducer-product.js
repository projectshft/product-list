import { FETCH_PRODUCT } from "../actions";

const DEFAULT_STATE = {
  items: [],
  count: 0
}

// FETCH_PRODUCT will be 9 products
const ProductsReducer = function (state = DEFAULT_STATE, action) {
  //console.log(action.payload.data[0].prod);
  switch (action.type) {
    case FETCH_PRODUCT:
      return {
        items: action.payload.data[0].prod,
        count: action.payload.data[0].number,
      };
    default:
      return state;
}};

export default ProductsReducer;