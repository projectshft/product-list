import { combineReducers } from "redux";
import { productReducer } from "./products";

export const allReducers = combineReducers({
  //productCount: productCountReducer,
  products: productReducer,
});
