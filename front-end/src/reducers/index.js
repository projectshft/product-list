import { combineReducers } from "redux";
import ProductsReducer from "./reducer-products";
import ParamsReducer from "./reducer-params";

const rootReducer = combineReducers({
   products: ProductsReducer,
   params: ParamsReducer
});

export default rootReducer;