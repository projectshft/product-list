import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reducers from './reducers';
import promise from 'redux-promise';
import { createStore, applyMiddleware } from "redux";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
    </Provider>
  </React.StrictMode>
);
