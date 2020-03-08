import { combineReducers } from 'redux';
import productsReducer from './products';
import categoryReducer from './category';

const rootReducer = combineReducers({ productsReducer, 
  categories: categoryReducer, });

export default rootReducer;
