import {combineReducers } from 'redux'
import productsReducer from './ProductsReducer'
import searchReducer from './SearchReducer'


const rootReducer = combineReducers({
  productState: productsReducer,
  searchState: searchReducer
})

export default rootReducer