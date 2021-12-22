import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider, BrowserRouter, Route, Switch } from "react-redux";
import promise from "redux-promise";

import Header from "./components/header";
import ProductsIndex from "./components/products-index";

import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>    
      <Header> 
        <ProductsIndex />     
      </Header>      
  </Provider>,
  document.getElementById('root')
);
