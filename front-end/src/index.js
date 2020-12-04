import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import promise from 'redux-promise';

import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <div className= 'col-md-9 offset-2'>
    <App />
  </div>
  </Provider>,
  document.getElementById('root')
);


