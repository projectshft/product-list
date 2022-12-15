import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const createStoreWithMiddleWare = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleWare(reducers, composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);