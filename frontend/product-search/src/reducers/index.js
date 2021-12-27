import { combineReducers } from 'redux';
import productReducer from './reducer-product';

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
