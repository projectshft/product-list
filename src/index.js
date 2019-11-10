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
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <div className="title-text">Products</div>
      <div className="container">
        <div
          className="row justify-content-center"
          style={{ paddingBottom: "30px" }}
        >
          <div className="col-5" style={{ clear: "both" }}>
            <SearchBar />
          </div>
          <div className="col-2" style={{ clear: "both" }}>
            <div className="inner-section">
              <select style={{ width: "100%" }}>
                <option>Category...</option>
                <option>Red</option>
                <option>Green</option>
              </select>
            </div>
          </div>
          <div className="col-2" style={{ clear: "both" }}>
            <div className="inner-section">
              <select style={{ width: "100%" }}>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ paddingBottom: "30px" }}
        >
          <div className="col-3" style={{ clear: "both" }}>
            <div>
              <span style={{ float: "left" }}>Category: Games</span>
              <span style={{ float: "right" }}>$50</span>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/200"
                className="img-fluid"
                alt="Product"
                style={{ width: "100%" }}
              ></img>
            </div>
            <div className="text-center">
              <span>PRODUCT NAME HERE</span>
            </div>
          </div>
          <div className="col-3" style={{ clear: "both" }}>
            <div>
              <span style={{ float: "left" }}>Category: Games</span>
              <span style={{ float: "right" }}>$50</span>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/200"
                className="img-fluid"
                alt="Product"
                style={{ width: "100%" }}
              ></img>
            </div>
            <div className="text-center">
              <span>PRODUCT NAME HERE</span>
            </div>
          </div>
          <div className="col-3" style={{ clear: "both" }}>
            <div>
              <span style={{ float: "left" }}>Category: Games</span>
              <span style={{ float: "right" }}>$50</span>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/200"
                className="img-fluid"
                alt="Product"
                style={{ width: "100%" }}
              ></img>
            </div>
            <div className="text-center">
              <span>PRODUCT NAME HERE</span>
            </div>
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ paddingBottom: "30px" }}
        >
          <div className="col-3" style={{ clear: "both" }}>
            <div>
              <span style={{ float: "left" }}>Category: Games</span>
              <span style={{ float: "right" }}>$50</span>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/200"
                className="img-fluid"
                alt="Product"
                style={{ width: "100%" }}
              ></img>
            </div>
            <div className="text-center">
              <span>PRODUCT NAME HERE</span>
            </div>
          </div>
          <div className="col-3" style={{ clear: "both" }}>
            <div>
              <span style={{ float: "left" }}>Category: Games</span>
              <span style={{ float: "right" }}>$50</span>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/200"
                className="img-fluid"
                alt="Product"
                style={{ width: "100%" }}
              ></img>
            </div>
            <div className="text-center">
              <span>PRODUCT NAME HERE</span>
            </div>
          </div>
          <div className="col-3" style={{ clear: "both" }}>
            <div>
              <span style={{ float: "left" }}>Category: Games</span>
              <span style={{ float: "right" }}>$50</span>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/200"
                className="img-fluid"
                alt="Product"
                style={{ width: "100%" }}
              ></img>
            </div>
            <div className="text-center">
              <span>PRODUCT NAME HERE</span>
            </div>
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ paddingBottom: "30px" }}
        >
          <div className="col-3" style={{ clear: "both" }}>
            <div>
              <span style={{ float: "left" }}>Category: Games</span>
              <span style={{ float: "right" }}>$50</span>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/200"
                className="img-fluid"
                alt="Product"
                style={{ width: "100%" }}
              ></img>
            </div>
            <div className="text-center">
              <span>PRODUCT NAME HERE</span>
            </div>
          </div>
          <div className="col-3" style={{ clear: "both" }}>
            <div>
              <span style={{ float: "left" }}>Category: Games</span>
              <span style={{ float: "right" }}>$50</span>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/200"
                className="img-fluid"
                alt="Product"
                style={{ width: "100%" }}
              ></img>
            </div>
            <div className="text-center">
              <span>PRODUCT NAME HERE</span>
            </div>
          </div>
          <div className="col-3" style={{ clear: "both" }}>
            <div>
              <span style={{ float: "left" }}>Category: Games</span>
              <span style={{ float: "right" }}>$50</span>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/200"
                className="img-fluid"
                alt="Product"
                style={{ width: "100%" }}
              ></img>
            </div>
            <div className="text-center">
              <span>PRODUCT NAME HERE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pages">
        <div className="pagination" style={{ display: "inline-block" }}>
          <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a className="active" href="#">
            2
          </a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">&raquo;</a>
        </div>
      </div>
    </div>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
