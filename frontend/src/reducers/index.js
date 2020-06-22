import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products.js';

const rootReducer = combineReducers({
  products: ProductsReducer
});

export default rootReducer;
