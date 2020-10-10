import { combineReducers } from "redux";

import ProductsReducer from "./reducer-fetch-products";
import setCurrentPage from "./reducer-set-current-page";
import setSortOrder from "./reducer-set-sort-order";
import setSearchTerm from "./reducer-set-search-term";
import setCategory from "./reducer-set-category";

console.log('in reducer combiner');
const rootReducer = combineReducers({
    products: ProductsReducer,
    currentPage: setCurrentPage,
    sortOrder: setSortOrder,
    searchTerm: setSearchTerm,
    category: setCategory

  });
  
  export default rootReducer;