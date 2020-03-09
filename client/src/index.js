import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from 'redux-promise'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers';
import Products from './components/products';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render( 
    <Provider store ={createStoreWithMiddleware(reducers, composeWithDevTools())}>
      < Products / >
    </Provider>,document.getElementById('root'));


