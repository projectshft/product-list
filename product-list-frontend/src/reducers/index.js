import { combineReducers } from "redux";
import ProductReducer from './product-reducer';

const rootReducer = combineReducers({
    products: ProductReducer
});

export default rootReducer;