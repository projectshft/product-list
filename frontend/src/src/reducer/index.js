import { combineReducers } from 'redux';
import reducers from './root_reducer';

const rootReducer = combineReducers({
  product: reducers.ProductReducer,
  combo: reducers.ComboReducer,
});

export default rootReducer;
