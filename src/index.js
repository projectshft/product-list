import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from 'redux-promise'

import reducers from './reducers';
import ProductIndex from './components/product-index';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'


const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render( 
  <Provider store ={createStoreWithMiddleware(reducers)}>
    < ProductIndex / >
  </Provider>,document.getElementById('root'));
