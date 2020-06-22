import { combineReducers } from "redux";
import ProductReducer from './products-reducer';
import SearchTermReducer from './searchterm-reducer';
import CategoryReducer from './category-reducer';
import SortByReducer from './sort-by-reducer';
import PageReducer from './page-reducer';

const rootReducer = combineReducers({
  //sets the products
  products: ProductReducer,
  //sets the search term from the search bar
  searchTerm: SearchTermReducer,
  //sets the category from the category dropdown
  category: CategoryReducer,
  //sets the sortBy value from the sortBy dropdown
  sortBy: SortByReducer,
  //sets the page to be displayed
  page: PageReducer
});

export default rootReducer;