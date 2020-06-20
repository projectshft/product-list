import { combineReducers } from 'redux';
import ProductReducer from './reducer-products';

const rootReducer = combineReducers({
  products: ProductReducer
});

export default rootReducer;