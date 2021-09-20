import {combineReducers} from 'redux'
import countReducer from './productTotal';
import searchReducer from './searchReducer';

const dataReducer = combineReducers({
  search: searchReducer,
  count: countReducer
});

export default dataReducer