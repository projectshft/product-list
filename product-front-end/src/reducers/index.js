import { combineReducers } from "redux";
import productsReducer from "./products-reducer";
import countReducer from "./count-reducer";
import queryReducer from "./query-reducer";
import categoryReducer from "./category-reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  pages: countReducer,
  query: queryReducer,
  categories: categoryReducer
});

export default rootReducer;
