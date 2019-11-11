import { combineReducers } from "redux";
import ProductsReducer from "./products-reducer";

const rootReducer = combineReducers({
    products: ProductsReducer
});

export default rootReducer;