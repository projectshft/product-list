import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import Header from './components/header';
import SearchNav from './components/searchNav';
import Products from './components/products';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <React.StrictMode>
      <Header>
        <SearchNav />
        <Products />
      </Header>
    </React.StrictMode>
  </Provider>
);

