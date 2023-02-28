import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import promise from "redux-promise";
import thunk from "redux-thunk";
import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const root = ReactDOM.createRoot(document.getElementById('root'));


const store = configureStore({ 
  reducer: rootReducer, 
  middleware: [promise, thunk],
});

root.render(
  <Provider store={store} >
    <App />
  </Provider>
);