import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import { devToolsEnhancer } from 'redux-devtools-extension';

import App from './App';
import reducer from './Redux/Reducers/index';

ReactDOM.render(
  <Provider store={createStore(reducer, devToolsEnhancer())}>
    <App />
  </Provider>,
  document.getElementById('root')
);


