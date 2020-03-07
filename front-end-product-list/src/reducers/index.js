import { combineReducers } from 'redux';
import ProductReducer from './reducer-product.js';

const rootReducer = combineReducers({
  product: ProductReducer,
});

export default rootReducer;
