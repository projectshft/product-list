import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'
import AppIndex from './components/app';
import rootReducers from './reducers/index';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
// import 'font-awesome/css/font-awesome.min.css';




const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store ={createStoreWithMiddleware(rootReducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <AppIndex />
    </Provider>,
    document.getElementById('root')
    );


