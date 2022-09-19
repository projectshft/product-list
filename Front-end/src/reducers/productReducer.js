import { FETCH_PRODUCTS } from "../actions";

const productReducer = (state = { data: {}, request: {} }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log("payload", action.payload);
      return {
        data: action.payload.search,
        prevSearch: action.payload.products.data,
      };

    default:
      return state;
  }
};

export default productReducer;
