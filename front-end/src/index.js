import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore , applyMiddleware} from "redux";
import 'bootstrap/dist/css/bootstrap.css';
import promise from 'redux-promise'

import App from "./parent-components/App";
import  RootReducer  from './reducers/combined-reducers'



const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(RootReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);



