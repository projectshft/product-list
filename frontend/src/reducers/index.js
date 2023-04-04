import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import productReducer from "./productsReducer";

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;