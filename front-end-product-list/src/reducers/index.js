import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './search-reducer';
import categoriesReducer from './categories-reducer';
import sortReducer from './sort-reducer';

const rootReducer = combineReducers({
  search: searchReducer,
  categories: categoriesReducer,
  sort: sortReducer,
});

export default rootReducer;