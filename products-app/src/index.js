import rootReducer from './reducers/index.js';
import { createStore, applyMiddleware } from "redux";
import promise from 'redux-promise';
import { Provider } from "react-redux";
import App from './App';
import { createRoot } from 'react-dom/client';
import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const container = document.getElementById('root');
const root = createRoot(container);
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

root.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
