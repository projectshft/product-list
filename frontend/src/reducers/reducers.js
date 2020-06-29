import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';
import SortReducer from './reducer-sort';
import SearchTermReducer from './reducer-search-term';
import PagesReducer from './reducer-pages';
import CategoryReducer from './reducer-category';

const rootReducer = combineReducers({
  // Note that productData's state is an object
  // containing count and the array of all products
  productData: ProductsReducer, 
  sort: SortReducer,
  searchTerm: SearchTermReducer,
  category: CategoryReducer,
  page: PagesReducer
});

export default rootReducer;
