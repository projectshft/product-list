import { combineReducers } from "redux";
import reducers from "./prodReducer.js";

//to-do: account for pagination
const rootReducer = combineReducers({
  first: reducers.FirstReducer,
  products: reducers.ProductsReducer
});

export default rootReducer;