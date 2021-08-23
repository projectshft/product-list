import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import reducers from "./reducers";
import PageLayout from './components/page-layout';

// function createStoreWithMiddleware to dispatch the action FETCH_FORECAST when the promise completes
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// set props here as parent for children Search, Category, Price, Page, and Products to use
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <PageLayout />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// npm start to get it going on localhost:3000 - doesn't work now - why?, says Node.js listening on port 8000
