import { combineReducers } from 'redux';
import productReducer from './productsReducer';
import categoryReducer from './categoryReducer';
import sortReducer from './sortReducer';
import totalPageReducer from './totalPageReducer';
import currentPageReducer from './currentPageReducer';


const rootReducer = combineReducers({
  products: productReducer,
  category: categoryReducer, 
  sortOrder: sortReducer,
  totalPages: totalPageReducer,
  currentPage: currentPageReducer
});

export default rootReducer;