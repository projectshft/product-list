import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';


// COMBINE MULTIPLE REDUCERS (category-filter, pagination, price-sort)

const rootReducer = combineReducers({
  products: ProductsReducer,
});

export default rootReducer;