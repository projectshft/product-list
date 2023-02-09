import { GET_PRODUCTS_BY_CATEGORY } from "../actions/index";

function productsReducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_CATEGORY:
      return action.payload.data;
    default:
      return state;
  }
}

export default productsReducer;



