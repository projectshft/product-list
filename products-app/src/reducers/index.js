import { combineReducers } from "redux";
import productsReducer from "./reducer-products";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;