import React from 'react';
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import 'bootstrap/dist/css/bootstrap.css';

import App from "./App";
import reducers from "./reducers";

ReactDom.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>, 
  document.getElementById('root')
)


