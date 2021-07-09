import { FETCH_PRODUCTS } from "../actions";

const DEFAULT_STATE = {
  products: [],
  category: null,
  searchTerm: null,
  sort: null,
  page: null,
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
        products: [action.payload.data],
      };
    default:
      return state;
  }
};
export default ProductReducer;
