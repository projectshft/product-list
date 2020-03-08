import { combineReducers } from 'redux';
import ProductReducer from './reducer-product.js';

const rootReducer = combineReducers({
  products: ProductReducer,
});

export default rootReducer;
