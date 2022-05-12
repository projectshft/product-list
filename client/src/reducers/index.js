import { combineReducers } from 'redux';
import productReducer from './searchReducer'
import dummyDataReducer from './searchReducer'

const rootReducer = combineReducers({
  products: productReducer,
  dummyData: dummyDataReducer
});

export default rootReducer;