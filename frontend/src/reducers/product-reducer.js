import { FETCH_PRODUCTS } from "../actions";

const DEFAULT_STATE = {
  products: [],
  count: null,
  categories: [],
};

const ProductReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      if (!action.payload.data) {
        return {
          state,
        };
      }
      return {
        products: [action.payload.data.products],
        count: action.payload.data.count,
        categories: [action.payload.data.categories],
      };
    default:
      return state;
  }
};
export default ProductReducer;
