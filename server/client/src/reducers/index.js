import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';

//Only one reducer for now, but good practice to combine reducers for future functionality
const rootReducer = combineReducers({
  products: ProductsReducer
});

export default rootReducer;