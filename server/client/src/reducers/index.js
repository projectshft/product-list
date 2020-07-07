import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';
import TotalProductsReducer from './reducer-total-products';
import QueryReducer from './reducer-query'


/* We will combine three reducers to separate out our redux store state into three
parts: the products, the number of total products, and the persisting query state
*/
const rootReducer = combineReducers({
  products: ProductsReducer,
  totalProducts: TotalProductsReducer,
  query: QueryReducer
});

export default rootReducer;