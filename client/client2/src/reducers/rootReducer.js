import {combineReducers} from 'redux'
import productListReducer from './productsReducer'
import singleProductReducer from './singleReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
  products: productListReducer,
  singleProduct: singleProductReducer,
  cart:cartReducer
});

export default rootReducer