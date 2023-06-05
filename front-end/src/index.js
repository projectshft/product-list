import 'bootstrap/dist/css/bootstrap.min.css';
import "@popperjs/core";
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import rootReducer from './reducers';
import Header from './components/Header';
import App from './components/App';
import './index.css';


const store = configureStore({
  reducer: rootReducer,
  middleware:[thunk]
})

ReactDOM.render(
  <Provider store={store}>
    <Header />
    <App />
  </Provider>,
  document.getElementById('root')
);


