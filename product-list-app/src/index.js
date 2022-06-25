import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import productsReducer from './reducers';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={createStore(productsReducer)}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);