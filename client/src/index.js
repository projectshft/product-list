import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css";
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise'
import rootReducer from './reducers/index'


const store = applyMiddleware(promise)(createStore); 


ReactDOM.render(
  <Provider store={store(rootReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

