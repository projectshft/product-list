import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ProductsReducer from "./products-reducer";
import PageNumReducer from "./page-num-reducer";
import NumPagesReducer from "./num-pages-reducer";

const rootReducer = combineReducers({
  products: ProductsReducer,
  pageNum: PageNumReducer,
  numPages: NumPagesReducer,
  form: formReducer
});

export default rootReducer;
