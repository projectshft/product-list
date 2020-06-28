import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';
import SortReducer from './reducer-sort';
import SearchTermReducer from './reducer-search-term';
import PagesReducer from './reducer-pages';
import CategoryReducer from './reducer-category';

const rootReducer = combineReducers({
  products: ProductsReducer,
  sort: SortReducer,
  searchTerm: SearchTermReducer,
  category: CategoryReducer,
  page: PagesReducer
});

export default rootReducer;
