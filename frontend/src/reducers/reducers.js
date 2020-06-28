import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';
import SortReducer from './reducer-sort';
import SearchTermReducer from './reducer-search-term';
// import CategoriesReducer from './reducer-categories';
import CategoryReducer from './reducer-category';

const rootReducer = combineReducers({
  products: ProductsReducer,
  // categories: CategoriesReducer,
  sort: SortReducer,
  searchTerm: SearchTermReducer,
  category: CategoryReducer
});

export default rootReducer;
