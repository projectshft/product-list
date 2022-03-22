import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import promise from 'redux-promise';


const storeWithPromiseMiddleware = applyMiddleware(promise)(createStore)(rootReducer);

ReactDOM.render(
  <Provider store={storeWithPromiseMiddleware}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
