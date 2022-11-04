import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './search-reducer';
import categoriesReducer from './categories-reducer';

const rootReducer = combineReducers({
  search: searchReducer,
  categories: categoriesReducer,
});
export default rootReducer;