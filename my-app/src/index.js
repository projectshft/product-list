import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducer from './reducers';

const createStoreWithPromiseMiddleware = applyMiddleware(promise)(createStore); 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithPromiseMiddleware(rootReducer)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
