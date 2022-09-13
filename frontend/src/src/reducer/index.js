import { combineReducers } from 'redux';
import reducers from './root_reducer';

const rootReducer = combineReducers({
  product: reducers.ProductReducer,
  // page: reducers.PageReducer,
  // price: reducers.PriceReducer,
  // category: reducers.CategoryReducer,
  combo: reducers.ComboReducer,
});

export default rootReducer;
