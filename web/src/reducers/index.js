import { combineReducers } from "redux";

import ProductsReducer from "./reducer-fetch-products";
import setCurrentPage from "./reducer-set-current-page";
import setSortOrder from "./reducer-set-sort-order";

console.log('in reducer combiner')
const rootReducer = combineReducers({
    products: ProductsReducer,
    currentPage: setCurrentPage,
    sortOrder: setSortOrder

  });
  
  export default rootReducer;