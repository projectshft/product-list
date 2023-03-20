import { combineReducers } from "redux";
import { GET_PRODUCTS, GET_PRODUCT } from '../actions/index'

const DEFAULT_STATE = {
  products: [],
  order: []
};

const productsReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log(action.payload);
      return {
        products: action.payload,
        order: []
      }
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  products: productsReducer
});

export default rootReducer;
