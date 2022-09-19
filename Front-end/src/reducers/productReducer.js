import { FETCH_PRODUCTS } from "../actions";

const productReducer = (state = { data: {}, request: {} }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        data: action.payload.search,
        prevSearch: action.payload.products.data,
      };

    default:
      return state;
  }
};

export default productReducer;
