import { combineReducers } from "redux";
import ProductsReducer from "./ProductsReducer.js";

const rootReducer = combineReducers({
  products: ProductsReducer,
});

export default rootReducer;