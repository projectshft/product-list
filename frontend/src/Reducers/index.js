/**
 * use combine reducers for now even if only have one reducer
 *  able to add reducers in the future, i.e. users/vendors
 *  should have a form reducer
 */

import { combineReducers } from 'redux';
import ProductReducer from './reducer-products';

const rootReducer = combineReducers({
  products: ProductReducer
});

export default rootReducer;