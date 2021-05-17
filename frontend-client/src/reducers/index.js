import {combineReducers} from 'redux';
import categoriesReducer from './categories-reducer';
import currentPageReducer from './current-page-reducer';
import productsReducer from './products-reducer';

const rootReducer = combineReducers({
  products: productsReducer,
  currentPage: currentPageReducer,
  categories: categoriesReducer
});

export default rootReducer;