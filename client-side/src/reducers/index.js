import { combineReducers } from "redux";
import ProductsReducer from "./ProductsReducer.js";

const rootReducer = combineReducers({
  forecasts: ProductsReducer,
});

export default rootReducer;