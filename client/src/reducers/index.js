import { combineReducers } from "redux";
import ProductsReducer from "./reducer-products";
import CountReducer from "./reducer-count";

const rootReducer = combineReducers({
  products: ProductsReducer,
  count: CountReducer
});

export default rootReducer;