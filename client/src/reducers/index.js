import { combineReducers } from 'redux';
import productReducer from './productsReducer';
import categoryReducer from './categoryReducer';
import sortReducer from './sortReducer';



const rootReducer = combineReducers({
  products: productReducer,
  category: categoryReducer, 
  sortOrder: sortReducer
});

export default rootReducer;