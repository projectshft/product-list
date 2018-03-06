import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers";

import Page from "./components/page"
// import SearchBar from "./components/search-bar";
// import ProductsGrid from "./components/products-grid";
// import Footer from "./components/footer"
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(reducers);

const App = () => {
  return  (
    <div className="container-fluid">
      <Page />
    </div>
  );
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
