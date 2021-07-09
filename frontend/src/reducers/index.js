import { combineReducers } from "redux";
import ProductReducer from "./product-reducer";

const rootReducer = combineReducers({
  productData: ProductReducer,
});

export default rootReducer;
