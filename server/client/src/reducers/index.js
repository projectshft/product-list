import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';
import TotalProductsReducer from './reducer-total-products';
import QueryReducer from './reducer-query'

//Only one reducer for now, but good practice to combine reducers for future functionality
const rootReducer = combineReducers({
  products: ProductsReducer,
  totalProducts: TotalProductsReducer,
  query: QueryReducer
});

export default rootReducer;