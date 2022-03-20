import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import Search from './components/search';
import Products from './components/products';
import Pages from './components/pagination';
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreWithMiddleWare = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleWare(reducers)}>
    <Search />
    <Products />
    <Pages />
  </Provider>,
  document.getElementById('root')
);
