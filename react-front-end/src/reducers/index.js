import { combineReducers } from 'redux';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  currentQuery: searchReducer
})

export default rootReducer;