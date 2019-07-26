import { combineReducers } from 'redux';
import productReducer from './productsReducer';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  products: productReducer,
  form: formReducer
});

export default rootReducer;