import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";

import reducers from "./reducers";
import SearchBar from "./containers/search-bar";
import FilterCategories from "./containers/filter-categories";
import SortPrice from "./containers/sort-price";
import Pagination from "./components/pagination"
import Products from "./components/products"


import 'bootstrap/dist/css/bootstrap.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <div>
          <SearchBar/>
          <FilterCategories/>
          <SortPrice/>
          <Pagination/>
          <Products/>
      </div>
  </Provider>,
  document.getElementById('root')
);