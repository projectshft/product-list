import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { store }from '../src/store/store' 
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const root = ReactDOM.createRoot(document.getElementById('root'));


let store = configureStore()

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
