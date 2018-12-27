import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from './components/App';
import reducers from "./reducers";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ReactDOM.render(
   <Provider store={createStore(reducers)}>
      <App />
   </Provider>, 
   document.getElementById('root')
);

