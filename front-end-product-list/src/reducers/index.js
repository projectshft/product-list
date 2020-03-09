import { combineReducers } from 'redux';
import ProductReducer from './reducer-product.js';

const rootReducer = combineReducers({
  productList: ProductReducer,
});

export default rootReducer;
