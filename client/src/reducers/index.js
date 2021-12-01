import { combineReducers } from "redux";
import productsReducer from "./products-reducer";
import countReducer from "./count-reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  count: countReducer
  
});

export default rootReducer;