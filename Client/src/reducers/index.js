import ProductsReducer from "./products";
import {combineReducers} from 'redux'


const rootReducer = combineReducers({
  products: ProductsReducer,
});

export default rootReducer;