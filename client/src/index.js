import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from 'redux-promise'
import rootReducers from './reducers';
import AppFinal from './components/AppFinal';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './index.css'


const createStoreWithMiddleware = applyMiddleware(promise)(createStore)


ReactDOM.render(
    <Provider store ={createStoreWithMiddleware(rootReducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <AppFinal />
    </Provider>,
    document.getElementById('root')
    );