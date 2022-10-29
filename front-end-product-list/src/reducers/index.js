import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './search-reducer';
// import 2Reducer from './2-reducer';
// import 3Reducer from './3-reducer';

const rootReducer = combineReducers({
  search: searchReducer,
//   2: 2Reducer,
//   3: 3Reducer,
});

export default rootReducer;