import { FETCH_PRODUCTS } from "../actions/actions.js";

const productsReducer = function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      
      if (!action.payload.data) {
        return state;
      };

      state = (action.payload.data[0].products)
      return state;

    default:
      return state;
  }
};

export default productsReducer;