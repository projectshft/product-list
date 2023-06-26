import { FETCH_PRODUCTS } from "../actions";

// reducer grabs products and count data from the url request
const searchReducer = function (state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        products: action.payload.data.products,
        count: action.payload.data.count
      }
    default:
      return state;
  };
};

export default searchReducer;