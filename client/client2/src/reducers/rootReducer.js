import {combineReducers} from 'redux'
import productListReducer from './productsReducer'
import singleProductReducer from './singleReducer'

const rootReducer = combineReducers({
  products: productListReducer,
  singleProduct: singleProductReducer
});

export default rootReducer