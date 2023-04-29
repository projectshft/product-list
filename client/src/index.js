import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store'


const el = document.getElementById('root');
const root = createRoot(el);

root.render(
  <Provider store={store} >
    <App />
  </Provider>
);