import { combineReducers } from "redux";
import ProductsReducer from "./reducer-products";
import SearchProductsReducer from "./reducer-search";
import SearchCategoriesReducer from "./reducer-search-categories";
import SortProductsReducer from "./reducer-sort-products"
  
const rootReducer = combineReducers({
  products: ProductsReducer,
  searchedProducts: SearchProductsReducer,
  searchedCategories: SearchCategoriesReducer,
  sortedProducts: SortProductsReducer
});

export default rootReducer;