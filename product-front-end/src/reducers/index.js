import { combineReducers } from "redux";
import productsReducer from "./products-reducer";
import countReducer from "./count-reducer";
import queryReducer from "./query-reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  pages: countReducer,
  query: queryReducer,
});

export default rootReducer;
