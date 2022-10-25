import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux"; 
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise";


//ONCE I IMPORT THE REDUCER, I CAN USE IT IN THE STORE
// const store = createStore(reducers, composeWithDevTools(applyMiddleware(promise)));

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

const store = createStore(composeWithDevTools(applyMiddleware(promise)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);