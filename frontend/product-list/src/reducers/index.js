import { combineReducers } from "redux";
import ProductsReducer from "./reducer-products.js";
import CategoryListReducer from "./reducer-category-list.js";

const rootReducer = combineReducers({
  products: ProductsReducer,
  categories: CategoryListReducer,
});

export default rootReducer;
