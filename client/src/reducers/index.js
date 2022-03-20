import { combineReducers } from 'redux';
import countReducer from './count';
import productReducer from './products';
import queryReducer from './query';




export default combineReducers({
  products: productReducer,
  query: queryReducer,
  count: countReducer,
});