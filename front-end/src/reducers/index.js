import { combineReducers } from "redux";
import ProductReducer from "./reducer-product";

// added to make expanding this app easier, not exactly necessary for this simple app
const rootReducer = combineReducers({
  products: ProductReducer,
});

export default rootReducer;
