import { combineReducers } from "redux"
import ProductReducer from "./product-reducer.js"

const rootReducer = combineReducers({
    productsList: ProductReducer
})

export default rootReducer