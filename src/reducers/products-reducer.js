import { GET_PRODUCTS } from "../actions";

const DEFAULT_STATE = {
  products: [],
  count: null,
  categories: []
};

const ProductsReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        products: action.payload.data.products,
        count: action.payload.data.count,
        categories: action.payload.data.categories
        }
    default:
      return state;
  };
};

export default ProductsReducer;