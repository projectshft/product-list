import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import promise from 'redux-promise';
import dataReducer from './reducers/reducer'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(dataReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
