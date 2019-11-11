import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';
import App from './App';
import reducers from "./reducers/index";
import promise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <App />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);


