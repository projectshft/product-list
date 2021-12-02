import { combineReducers } from "redux";
import productsReducer from "./products-reducer";
import countReducer from "./count-reducer";
import categoriesReducer from "./categories-reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  count: countReducer,
  categories: categoriesReducer
  
});

export default rootReducer;