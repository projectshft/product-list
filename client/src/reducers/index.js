import {combineReducers} from 'redux';
import filterReducer from './filterReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  filters: filterReducer,
  products: productReducer,
  categories: categoryReducer,
});

export default rootReducer;