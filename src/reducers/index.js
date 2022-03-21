import { combineReducers } from 'redux';
import ReducerMain from './ReducerMain';

const rootReducer = combineReducers({
  products: ReducerMain,
});

export default rootReducer;
