import { GET_PRODUCTS } from "../actions";

const DEFAULT_STATE = {
  products: []
}

const ProductsReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        products: [action.payload.data],
        }
    default:
      return state;
  };
};

export default ProductsReducer;