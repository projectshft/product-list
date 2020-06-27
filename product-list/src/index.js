import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers";

import SearchBar from "./components/SearchBar"
import App from "./components/App"


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
 <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <h1>Products</h1>
      <SearchBar />
      <App />
    </div>
 </Provider>,
  document.getElementById('root')
);