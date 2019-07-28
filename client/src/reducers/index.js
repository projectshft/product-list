import { combineReducers } from 'redux';
import productReducer from './productsReducer';
import categoryReducer from './categoryReducer';
import sortReducer from './sortReducer';
import totalPageReducer from './totalPageReducer';



const rootReducer = combineReducers({
  products: productReducer,
  category: categoryReducer, 
  sortOrder: sortReducer,
  totalPages: totalPageReducer
});

export default rootReducer;