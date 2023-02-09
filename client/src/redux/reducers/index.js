import { combineReducers} from 'redux'
import productsReducer from './productsReducer.js'
import pageReducer from './pageReducer.js'
import filtersReducer from './filtersReducer.js'

const rootReducer = combineReducers({
  filterItems: filtersReducer,
  allItems: productsReducer,
  page: pageReducer,
});

export default rootReducer;
