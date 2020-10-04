import { combineReducers } from "redux";

import ProductsReducer from "./reducer-fetch-products";
// this is vestigial is that how you spell that?
// import DistanceReducer from "./reducer-send-dest";
console.log('in reducer combiner')
const rootReducer = combineReducers({
    products: ProductsReducer,
  });
  
  export default rootReducer;