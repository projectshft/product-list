import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import App from './components/App';
import productsReducer from './reducers';
import "bootstrap/dist/css/bootstrap.css";

const createStoreWithPromiseMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={createStoreWithPromiseMiddleware(productsReducer)}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);