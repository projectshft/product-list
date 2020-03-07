import { combineReducers } from 'redux';
import CategoryReducer from './reducer-category';
// import PriceReducer from './reducer-price';

const rootReducer = combineReducers({
  category: CategoryReducer,
  // price: PriceReducer
});

export default rootReducer;