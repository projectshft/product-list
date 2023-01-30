import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import productReducer from "./counter";

const reducer = combineReducers({
  product: productReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
