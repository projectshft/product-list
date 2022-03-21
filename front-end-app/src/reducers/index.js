import productReducer from 'productReducer.js';
import searchSettingsReducer from 'searchSettingsReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  products: productReducer,
  searchSettings: searchSettingsReducer
});

export default rootReducer;