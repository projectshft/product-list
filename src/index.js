import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import promise from "redux-promise";
import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App from './App';
import { BrowserRouter } from "react-router-dom";

const storeMiddleware = applyMiddleware(promise)(createStore);
const store = storeMiddleware(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
  
);


