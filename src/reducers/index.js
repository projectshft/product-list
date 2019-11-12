import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ProductsReducer from "./products-reducer";

// This function combines all reducers together
const rootReducer = combineReducers({
    products: ProductsReducer,
    form: formReducer
});

export default rootReducer;