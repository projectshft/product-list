import { combineReducers } from 'redux'
import ProductsReducer from './reducer-products'

const rootReducer = combineReducers({
	response: ProductsReducer
})

export default rootReducer
