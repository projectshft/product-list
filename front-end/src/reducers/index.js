import { combineReducers } from 'redux';
import productsReducer from './products';
import categoryReducer from './category';
// category reducer is not working at this time, didnt finished functionality unfortunately
const rootReducer = combineReducers({ productsReducer, 
  categoryReducer });

export default rootReducer;