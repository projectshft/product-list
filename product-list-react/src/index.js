import React from 'react';
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'

import App from "./App";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDom.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>, 
  document.getElementById('root')
)


