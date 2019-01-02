import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './index.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise'
import axios from 'axios'
import rootReducer from './reducers/index'
import rootUrl from './actions'

//generate fake data at the onset of application start-up
const generateFakeData = function() {
  axios.get(`${rootUrl}/api/generate-fake-data`)
}

generateFakeData();

const createStoreWithMiddleware= applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)} >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

