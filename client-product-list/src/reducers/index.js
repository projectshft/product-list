import { combineReducers } from "redux";
import ProductsReducer from "./reducer-products";
import TotalReducer from "./reducer-total";
import FilterReducer from "./reducer-filters";

const rootReducer = combineReducers({
  products: ProductsReducer,
  total: TotalReducer,
  filter: FilterReducer
});

export default rootReducer;


