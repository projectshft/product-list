// eslint-disable-next-line no-unused-vars
import { FETCH_PRODUCTS } from "../actions/fetchProducts.js";


const ProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log('hi');
      return action.payload.data;
    default:
      return state;
  }
};

export default ProductsReducer;

