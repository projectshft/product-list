import { combineReducers } from 'redux';
import products from './products';
import page from './page';


export default combineReducers({
  products,
  page
})
