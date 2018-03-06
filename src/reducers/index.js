import { combineReducers } from "redux";
import currentPageReducer from "./reducer-current-page";
import categoriesReducer from "./reducer-categories";
import productsReducer from "./reducer-products";
import paramsReducer from "./reducer-params"

const rootReducer = combineReducers({
  params: paramsReducer,
  categories: categoriesReducer,
  currentPage: currentPageReducer,
  products: productsReducer
});

export default rootReducer;