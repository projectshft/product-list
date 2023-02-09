import { combineReducers} from 'redux'
import productsReducer from './productsReducer.js'
import categoriesReducer from './categoriesReducer.js'

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
})

export default rootReducer