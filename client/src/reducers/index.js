import { combineReducers } from 'redux';
import categoryReducer from './reducer-category';
import productReducer from './reducer-product';

/* Combine category and product reducers into one reducer */

const rootReducer = combineReducers({
  productInfo: productReducer,
  categories: categoryReducer
});

export default rootReducer;
