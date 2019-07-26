import { combineReducers } from "redux";
import { FETCH_PRODUCTS } from "../actions";

const productsReducer = function (state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  products: productsReducer
});

export default rootReducer;