import { combineReducers} from 'redux'
import productsReducer from './productsReducer.js'
import countReducer from './countReducer.js'
import filtersReducer from './filtersReducer.js'

const rootReducer = combineReducers({
  filterItems: filtersReducer,
  allItems: productsReducer,
  count: countReducer,
});

export default rootReducer;
