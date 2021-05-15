import {combineReducers} from 'redux';
import currentPageReducer from './current-page-reducer';
import productsReducer from './products-reducer';

const rootReducer = combineReducers({
  products: productsReducer,
  currentPage: currentPageReducer
});

export default rootReducer;