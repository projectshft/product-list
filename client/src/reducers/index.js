import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ProductReducer from './products-reducer'

const rootReducer = combineReducers({
  products: ProductReducer,
  form: formReducer
});

export default rootReducer;