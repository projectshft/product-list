import { combineReducers } from 'redux';
import searchReducer from './reducer-search';

const rootReducer = combineReducers({
  searches: searchReducer,
});

export default rootReducer;
