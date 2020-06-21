import { combineReducers } from "redux";
import ProductReducer from './products-reducer';
import SearchTermReducer from './searchterm-reducer';
import CategoryReducer from './category-reducer';
import SortByReducer from './sort-by-reducer';
import PageReducer from './page-reducer';

const rootReducer = combineReducers({
  products: ProductReducer,
  searchTerm: SearchTermReducer,
  category: CategoryReducer,
  sortBy: SortByReducer,
  page: PageReducer
});

export default rootReducer;