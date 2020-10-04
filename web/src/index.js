import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reducers from './reducers';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
//css overrides and cusomization in index.css
import './index.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// const store = createStore(reducers)
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  {/* <Provider store={store}> */}
    <App />
  </Provider>, 
  
  document.getElementById('root')
);

