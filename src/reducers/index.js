import { combineReducers } from "redux";
import ProductsReducer from "./products-reducer";

const rootReducer = combineReducers({
  storeData: ProductsReducer,
});

export default rootReducer;