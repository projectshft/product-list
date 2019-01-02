import { combineReducers } from 'redux';
import productsReducer from './product-reducer'
import sortReducer from './sort-reducer'
import filterReducer  from './filter-reducer'


const rootReducer = combineReducers({
  products: productsReducer, 
  sort: sortReducer, 
  categories: filterReducer
})

export default rootReducer;