import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ProductsReducer from "./products-reducer";
import CategoriesReducer from "./categories-reducer";

const rootReducer = combineReducers({
  products: ProductsReducer,
  categories: CategoriesReducer,
  form: formReducer
});

export default rootReducer;
