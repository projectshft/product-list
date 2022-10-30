import { FETCH_PRODUCTS } from "../actions/fetchProducts.js";
// import { FETCH_PRODUCTS_ERROR } from "../actions/fetchProducts.js";

//attempting an empty ARRAY for default state outside of function so that it doesn't get redefined every time the function is called
const defaultState = [];

const ProductsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
};



export default ProductsReducer;
