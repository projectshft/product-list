import { combineReducers } from "redux";
import ProductsReducer from './reducer-products'

//the result of the reducer data goes to the "park", "campsite", "event" key
const rootReducer = combineReducers({
  products: ProductsReducer
});

export default rootReducer;