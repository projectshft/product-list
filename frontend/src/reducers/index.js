import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import pageReducer from "./pageReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  page: pageReducer,
});

export default rootReducer;
