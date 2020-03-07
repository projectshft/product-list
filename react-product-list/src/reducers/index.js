import { combineReducers } from 'redux';
import ProductsReducer from './products';
import queryReducer from './query';

const rootReducer = combineReducers({
  ProductInfo: ProductsReducer,
  QueryRequests: queryReducer
});

export default rootReducer;