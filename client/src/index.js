import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'
import AppIndex from './components/app';
import Reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store ={createStoreWithMiddleware(Reducers)}>
        <AppIndex />
    </Provider>,
    document.getElementById('root')
    );


