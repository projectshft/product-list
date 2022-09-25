import { combineReducers } from 'redux';
import reducers from './root_reducer';

const rootReducer = combineReducers({
  product: reducers.ProductReducer,
  products: reducers.ProductsReducer,
});

export default rootReducer;
