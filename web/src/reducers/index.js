import { combineReducers } from "redux";

import ProductsReducer from "./reducer-fetch-products";
import setCurrentPage from "./reducer-set-current-page";

console.log('in reducer combiner')
const rootReducer = combineReducers({
    products: ProductsReducer,
    currentPage: setCurrentPage
  });
  
  export default rootReducer;