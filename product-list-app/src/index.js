import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";

import App from "./components/App";
import reducers from "./reducers";

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

//add provider for store
ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
