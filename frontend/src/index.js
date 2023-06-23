import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { Provider } from 'react-redux'
import searchReducer from './reducers/search-reducer';
import Header from './components/header';
import SearchBar from './components/searchbar';
import Products from './components/products';
import Pagination from './components/pagination';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStoreWithMiddleware(searchReducer)}>
    <React.StrictMode>
      <Header>
        <SearchBar />
        <Products />
        <Pagination />
      </Header>
    </React.StrictMode>
  </Provider>
);

