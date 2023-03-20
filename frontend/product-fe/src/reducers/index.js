import { combineReducers } from "redux";
import ProductReducer from "./product-reducer";

const rootReducer = combineReducers({
  product: ProductReducer,
});

export default rootReducer;