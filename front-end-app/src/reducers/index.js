import productReducer from './productReducer';
import searchSettingsReducer from './searchSettingsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  main: productReducer,
  searchSettings: searchSettingsReducer
});

export default rootReducer;