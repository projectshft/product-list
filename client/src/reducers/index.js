import { combineReducers } from "redux";
import ProductsReducer from "./reducer-products";
import CategoriesReducer from "./reducer-categories";
import SearchReducer from "./reducer-search";
import SortReducer from "./reducer-sort";
import PageReducer from "./reducer-pages";

const rootReducer = combineReducers({
  products: ProductsReducer,  
  category: CategoriesReducer,
  search: SearchReducer,
  sort: SortReducer,
  page: PageReducer
});

export default rootReducer;