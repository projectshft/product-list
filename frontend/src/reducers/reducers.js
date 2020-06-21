import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';

const rootReducer = combineReducers({
  product: ProductsReducer
});

export default rootReducer;
