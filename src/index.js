import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from 'redux-promise'


import ProductIndex from './components/product-index';

ReactDOM.render( < ProductIndex / > , document.getElementById('root'));
