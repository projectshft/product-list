import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Provider binds Redux to React & makes store available to all containers
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import App from "./components/app";
import reducers from "./reducers/reducers";



import './index.css';


const store = applyMiddleware(promise,logger, thunk)(createStore);


ReactDOM.render(
    <Provider store={store(reducers)}> 
        <App />
    </Provider>   
    , document.getElementById('root')
);


