import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import rootReducer from './reducers';
import './index.css';
import App from './App';

// Create store using root reducer
const createStoreWithMiddleware = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promise))
);
// const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>,
  document.getElementById('root')
);
