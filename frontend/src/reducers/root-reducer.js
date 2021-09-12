import { combineReducers } from "redux";
import productsReducer from "./products-reducer";
import queryParamsReducer from "./query-params-reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  queryParams: queryParamsReducer
})

export default rootReducer;
