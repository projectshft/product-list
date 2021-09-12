import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import rootReducer from './reducers/root-reducer';
import { getProducts } from './actions/actions';

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(getProducts(''));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
