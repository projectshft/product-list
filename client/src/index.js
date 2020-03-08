import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux"
import promise from "redux-promise";
import reducers from "./reducers/index";
import HomePage from "./components/home-page";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <HomePage />
  </Provider>, document.getElementById('root')
);
