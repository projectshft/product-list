import { combineReducers } from "redux";
import ProductsReducer from "./reducer-product";

// added to make expanding this app easier, not exactly necessary for this simple app
const rootReducer = combineReducers({
  products: ProductsReducer,
});

export default rootReducer;
