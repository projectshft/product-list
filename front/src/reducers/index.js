import { combineReducers } from "redux";
import { productReducer } from "./products";
import { productCountReducer } from "./productCount";
import { pageQueryReducer } from "./pageQuery";
import { categoryReducer } from "./categories";

export const allReducers = combineReducers({
  productCount: productCountReducer,
  products: productReducer,
  page: pageQueryReducer,
  categories: categoryReducer,
});
