import { combineReducers } from 'redux'
import RequestUrlReducer from './reducer-request-url'
import ProductListReducer from './reducer-product-list'
const rootReducer = combineReducers({
  requestUrl: RequestUrlReducer,
  products: ProductListReducer
});

export default rootReducer;