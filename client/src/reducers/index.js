import {combineReducers} from 'redux';
import filterReducer from './filterReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  filters: filterReducer,
  products: productReducer,
});

export default rootReducer;