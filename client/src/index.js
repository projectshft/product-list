import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import promise from "redux-promise";
import thunk from "redux-thunk";
import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';

import { createRoot } from 'react-dom/client';
import { store } from './store'


//  PREVIOUSN ATTEMPT BELOW

// const root = ReactDOM.createRoot(document.getElementById('root'));

// const store = configureStore({ 
//   reducer: rootReducer, 
//   middleware: [promise, thunk],
// });

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
  <Provider store={store} >
    <App />
  </Provider>
);