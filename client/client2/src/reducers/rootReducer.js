import {combineReducers} from 'redux'
import productListReducer from './productsReducer'
import singleProductReducer from './singleReducer'
import cartReducer from './cartReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  products: productListReducer,
  singleProduct: singleProductReducer,
  cart:cartReducer,
  user:userReducer
});

export default rootReducer