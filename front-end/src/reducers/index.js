import { combineReducers } from 'redux';
import products from './reducer-products'

// combines all our reducers into one
const rootReducer = combineReducers({
    products: products
})

export default rootReducer;