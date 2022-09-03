import { combineReducers } from 'redux'
import productsReducer from './productsReducer'

// const rootReducer = combineReducers({
//   productQuery: productsReducer,
// })

const rootReducer = productsReducer;

export default rootReducer