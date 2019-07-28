import { combineReducers } from "redux";
import { FETCH_PRODUCTS } from "../actions";

const productsReducer = function (state = { 'products': [] }, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return (!action.payload.data) ? state : Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  data: productsReducer
});

export default rootReducer;