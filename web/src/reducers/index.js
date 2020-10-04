import { combineReducers } from "redux";

import ProductsReducer from "./reducer-fetch-products";

console.log('in reducer combiner')
const rootReducer = combineReducers({
    products: ProductsReducer,
  });
  
  export default rootReducer;