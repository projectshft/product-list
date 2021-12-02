import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import App from './components/App';
import reducers from "./reducers/index.js";


import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import promise from "redux-promise";

import {
  BrowserRouter as Router, Routes,
  Route,
  Link
} from "react-router-dom";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <Router>
      <Routes>
          <Route path="/products" element={<App/>}>
            
          </Route>
      </Routes>
    </Router > 
  </Provider>,
  document.getElementById('root')
);
