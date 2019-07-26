import { combineReducers } from "redux";
import { FETCH_PRODUCTS } from "../actions";

const productsReducer = function (state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log(action.payload.data)
      return (!action.payload.data)? state: action.payload.data.products;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  products: productsReducer
});

export default rootReducer;