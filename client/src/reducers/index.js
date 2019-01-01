import { combineReducers } from 'redux';
import productDisplayReducer from './product-reducer'
import searchReducers from './search-reducer'
import sortReducer from './sort-reducer'
import filterReducer  from './filter-reducer'
import generateFakeDataReducer from './generate-fake-data-reducer'

const rootReducer = combineReducers({
  generateFakeData : generateFakeDataReducer,
  displayCurrentProducts : productDisplayReducer,
  sort : sortReducer,
  filter : filterReducer,
})

export default rootReducer;