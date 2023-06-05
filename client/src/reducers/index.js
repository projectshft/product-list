
import { combineReducers } from "redux";
import ProductReducer from "./reducer-product"
const rootReducer = combineReducers({
    product : ProductReducer
});
export default rootReducer;