import { PRODUCTS_RECIEVED } from "../actions";

const defaultState = {
  products: []
};

const productsReducer = (state = defaultState, action) => {
  if (action.type === PRODUCTS_RECIEVED) {
    return {products: action.payload}
  }
  return state;
};

export default productsReducer;