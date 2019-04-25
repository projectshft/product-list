import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';
import QueryReducer from './reducer-query';


// COMBINE MULTIPLE REDUCERS (category-filter, pagination, price-sort)

const rootReducer = combineReducers({
  products: ProductsReducer,
  query: QueryReducer
});

export default rootReducer;