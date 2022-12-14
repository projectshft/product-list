import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import { applyMiddleWare, createStore } from 'redux';

import reducers from './reducers'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const createStoreWithMiddleWare = applyMiddleWare(promise)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleWare(reducers)}>
      <App />
    </Provider>
  </React.StrictMode>
);