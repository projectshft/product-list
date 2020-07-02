import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers";
import 'bootstrap/dist/css/bootstrap.css';

import SearchBar from "./components/SearchBar"
import App from "./components/App"


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
 <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <div className="row justify-content-md-center">
        <h1>Products</h1>
      </div>
      <App />
    </div>
 </Provider>,
  document.getElementById('root')
);