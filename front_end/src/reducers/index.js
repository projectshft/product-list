import { combineReducers } from "redux";
import { productsReducer } from "./productReducers";

const rootReducer = combineReducers({
  productData: productsReducer,
});

export default rootReducer; 