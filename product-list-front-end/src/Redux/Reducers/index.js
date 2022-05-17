import { combineReducers } from 'redux';
import products from './products';
import search from './search';


export default combineReducers({
  products,
  search
})
