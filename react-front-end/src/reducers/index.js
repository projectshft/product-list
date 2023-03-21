import { combineReducers } from "redux";
import { GET_PRODUCTS } from '../actions/index'

const DEFAULT_STATE = {
  products: [],
  order: []
};

const productsReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productsReducer
});

export default rootReducer;
