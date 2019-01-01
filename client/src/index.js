import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './index.css';
import { Provider } from 'react-redux.1'
import { createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise'

import rootReducer from './reducers/index'

const createStoreWithMiddleware= applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)} >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

