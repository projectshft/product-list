import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import rootReducer from "./reducers";
import "./index.css";
import App from "./App";
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById("root"));
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
root.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
