import React from "react"
import { ReactDOM } from "react-dom"
import "./index.css";
import App from "./App"; 
import "bootstrap/dist/css/bootstrap.css";
import { Provider, createStoreHook } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import "react-blocks/dist/styles.css";
import reducers from "./reducers"

const createStoreWithMiddleware =applyMiddleware(ReduxPromise)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App/>
  </Provider>,
  document.getElementById("root")
);