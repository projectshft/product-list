import { combineReducers } from "redux";
import ProductsReducer from "./reducer-products";
import QueryReducer from "./query-reducer"

const rootReducer = combineReducers({
  products: ProductsReducer,
  query: QueryReducer
});

export default rootReducer;