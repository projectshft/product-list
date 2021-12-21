import { combineReducers } from "redux";
import ProductsReducer from "./reducer-products";

const rootReducer = combineReducers({
  cities: ProductsReducer,
});

export default rootReducer;