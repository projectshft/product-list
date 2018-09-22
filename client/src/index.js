import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise';


import App from "./components/App";
import reducers from "./reducers";

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

//rightnow has dummy reducer
//  const store = createStore(() => [], {}, applyMiddleware(ReduxPromise))

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

//provider is a react component that reads changes from redux store and informs children components of state changes
//store/app are passed as props/children to store
// <Provider store={createStore(reducers)}>
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
