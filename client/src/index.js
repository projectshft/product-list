import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// Provider binds Redux to React & makes store available to all containers
// import {Provider} from 'react-redux';
// import {createStore} from 'redux';

import App from "./components/app";
// import rootReducer from "./reducers";


import './index.css';
// import reducerProducts from './reducers/reducer-products';

// const store = createStore(reducerProducts);

ReactDOM.render(
    <App />
    , document.getElementById('root')
);


