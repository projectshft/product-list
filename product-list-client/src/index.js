import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';
import reducers from './reducers';

import Products from './containers/products';




const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    < Products />
  </Provider>,
  document.getElementById('root')
)

