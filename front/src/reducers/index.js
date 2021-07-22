import { combineReducers } from "redux";
import { productReducer } from "./products";
import { productCountReducer } from "./productCount";
import { pageQueryReducer } from "./pageQuery";
import { searchTermReducer } from "./searchTerm";
import { categoryQueryReducer } from "./categoryQuery";
import { priceSortMethodReducer } from "./priceSortMethod";

export const allReducers = combineReducers({
  productCount: productCountReducer,
  products: productReducer,
  page: pageQueryReducer,
  searchTerm: searchTermReducer,
  categoryQuery: categoryQueryReducer,
  priceSortMethod: priceSortMethodReducer,
});
