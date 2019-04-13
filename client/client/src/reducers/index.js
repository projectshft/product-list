import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';

const rootReducer = combineReducers({
  products: ProductsReducer
});

export default rootReducer;