import { combineReducers } from "redux";
import SearchReducer from "./reducer-search";
import ProductsReducer from "./reducer-products";

const rootReducer = combineReducers({
  category: SearchReducer,
  products: ProductsReducer
});

export default rootReducer;