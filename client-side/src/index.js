import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux"; 
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise";
import rootReducer from "./reducers";
import App from "./App";


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(promise)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);