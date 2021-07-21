import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import ReactDOM from "react-dom";

// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import reducers from "./reducers";
// import promise from "redux-promise";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
