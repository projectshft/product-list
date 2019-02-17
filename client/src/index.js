import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Provider binds Redux to React & makes store available to all containers
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import logger from 'redux-logger';

import App from "./components/app";
import reducers from "./reducers/reducers";



import './index.css';


const store = applyMiddleware(promise,logger)(createStore);


ReactDOM.render(
    <Provider store={store(reducers)}> 
        <App />
    </Provider>   
    , document.getElementById('root')
);


