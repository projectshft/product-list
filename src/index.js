import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
//import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./components/SearchBar";
import ProductsList from "./components/ProductsList";
import PagesNav from "./components/PagesNav";
import CategoriesDrop from "./components/CategoriesDrop";
import SortsDrop from "./components/SortsDrop";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <div className="title-text">Products</div>
      <div className="container">
        <div className="row justify-content-center product-row">
          <div className="col-5 grid-item">
            <SearchBar />
          </div>
          <div className="col-2 grid-item">
            <CategoriesDrop />
          </div>
          <div className="col-2 grid-item">
            <SortsDrop />
          </div>
        </div>
        <ProductsList />
      </div>
      <PagesNav />
    </div>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
