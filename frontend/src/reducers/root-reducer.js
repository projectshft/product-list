import { combineReducers } from "redux";
import productsReducer from "./products-reducer";
import queryParamsReducer from "./query-params-reducer";
import countReducer from "./count-reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  queryParams: queryParamsReducer,
  count: countReducer
})

export default rootReducer;