import {combineReducers} from 'redux';
import productsReducer from './productsReducer';
import pagesReducer from './pagesReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  pages: pagesReducer
});

export default rootReducer;