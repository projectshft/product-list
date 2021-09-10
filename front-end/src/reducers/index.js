import { combineReducers } from 'redux';
import productsReducer from './reducers-products';

const rootReducer = combineReducers({
  products: productsReducer
});

export default rootReducer;