import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import './index.css';
import reducers from './reducers';
import App from './App';

const createStoreWithMiddleware = applyMiddleware(promise)(configureStore);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware({ reducer: reducers })}>
      <App />
    </Provider>
  </React.StrictMode>,
);