import { combineReducers } from 'redux';
import productReducer from './productsReducer';

const rootReducer = combineReducers({
  products: productReducer
});

export default rootReducer;