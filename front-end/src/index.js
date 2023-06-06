import 'bootstrap/dist/css/bootstrap.min.css';
import "@popperjs/core";
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
// import promise from 'redux-promise';
import { fetchProducts } from './actions';

import rootReducer from './reducers';
import Header from './components/Header';
import App from './components/App';
import './index.css';


const store = configureStore({
  reducer: rootReducer
})

store.dispatch(fetchProducts);

ReactDOM.render(
  <Provider store={store}>
    <Header />
    <App />
  </Provider>,
  document.getElementById('root')
);


