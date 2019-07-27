import { combineReducers } from 'redux';
import productReducer from './productsReducer';
import categoryReducer from './categoryReducer';



const rootReducer = combineReducers({
  products: productReducer,
  category: categoryReducer
});

export default rootReducer;