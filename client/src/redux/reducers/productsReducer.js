import { GET_PRODUCTS } from "../actions/index";

function productsReducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
}

export default productsReducer;