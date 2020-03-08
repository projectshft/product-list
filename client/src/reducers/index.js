import { combineReducers } from "redux";
import ProductsReducer from "./reducer-products";
import SearchReducer from "./reducer-search";

const rootReducer = combineReducers({
  products: ProductsReducer,
  searchRequests: SearchReducer
});

export default rootReducer;