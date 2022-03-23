import { PRODUCTS_RECIEVED } from "../actions";
import { QUERY_DATA_RECIEVED } from "../actions";

const defaultState = {
  products: []
};

const productsReducer = (state = defaultState, action) => {
  if (action.type === PRODUCTS_RECIEVED) {
    return {...state, products: action.payload}
  }
  if (action.type === QUERY_DATA_RECIEVED) {
    return {...state, queryData: action.payload}
  }
  return state;
};


export default productsReducer;