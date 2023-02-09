import { combineReducers} from 'redux'
import searchReducer from './searchReducer.js'
import categoryReducer from './categoryReducer'
import priceReducer from './priceReducer.js'
import productsReducer from './productsReducer.js'
import pageReducer from './pageReducer.js'

const rootReducer = combineReducers({
  price: priceReducer,
  category: categoryReducer,
  page: pageReducer,
  search: searchReducer,
  products: productsReducer
});

export default rootReducer
