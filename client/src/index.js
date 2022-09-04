import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore} from 'redux'
import { applyMiddleware } from "redux";
import { Provider } from "react-redux";
import promiseMiddleware from 'redux-promise';

import './index.css';
import App from './App';
import rootReducer from "./reducers";

const middlewareEnhancer = applyMiddleware(promiseMiddleware)
const store = createStore(rootReducer, middlewareEnhancer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
