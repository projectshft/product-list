import React from "react"
//import { ReactDOM } from "react-dom"; 
import ReactDOM from 'react-dom';
import "./index.css";
import App from "./App"; 
import "bootstrap/dist/css/bootstrap.css";
import { Provider, createStoreHook } from "react-redux";
import { createStore, applyMiddleware } from "redux";
//import ReduxPromise from "redux-promise";
import promiseMiddleware from 'redux-promise';

//import "react-blocks/dist/styles.css";
import reducer from "./reducers"

const createStoreWithMiddleware =applyMiddleware(promiseMiddleware)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducer)}>
    <App/>
  </Provider>,
  document.getElementById("root")
);