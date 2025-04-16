import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slices/productData";
import countReducer from "./slices/productCount";

const rootReducer = combineReducers({
  products: productReducer,
  count: countReducer,
});

export default rootReducer;
