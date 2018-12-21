import {combineReducers} from 'redux'
import productListReducer from './productsReducer'

const rootReducer = combineReducers({
  products:productListReducer
})

export default rootReducer