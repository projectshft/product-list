import 'bootstrap/dist/css/bootstrap.min.css';
import "@popperjs/core";
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
// import promise from 'redux-promise';


import rootReducer from './reducers';
import Header from './components/Header';
import App from './components/App';
import './index.css';
import { fetchProducts } from './actions';

const store = configureStore({
  reducer: rootReducer
})
//initial api call is made here before the DOM renders
store.dispatch(fetchProducts());

ReactDOM.render(
  <Provider store={store}>
    <Header />
    <App />
  </Provider>,
  document.getElementById('root')
);


