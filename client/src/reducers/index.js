import { combineReducers } from 'redux';
import productReducer from './productsReducer';
import categoryReducer from './categoryReducer';
import sortReducer from './sortReducer';
import totalPageReducer from './totalPageReducer';
import currentPageReducer from './currentPageReducer';
import errorReducer from './errorReducer'


const rootReducer = combineReducers({
  products: productReducer,
  category: categoryReducer, 
  sortOrder: sortReducer,
  totalPages: totalPageReducer,
  currentPage: currentPageReducer,
  error: errorReducer
});

export default rootReducer;