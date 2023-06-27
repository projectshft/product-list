import { combineReducers } from "redux";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({
  productData: productsReducer,
})

export default rootReducer;