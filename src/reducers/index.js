import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ProductsReducer from "./products-reducer";
import paginationReducer from "./pagination-reducer";
// import categoryReducer from "./category-reducer";

// This function combines all reducers together
const rootReducer = combineReducers({
    products: ProductsReducer,
    form: formReducer,
    // category: categoryReducer,
    pagination: paginationReducer
});

export default rootReducer;