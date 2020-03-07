import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';
import IndexCSS from './index.css'
import Home from './components/home';
import Start from './components/start';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <BrowserRouter>
    <Home />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
