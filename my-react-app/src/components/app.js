import React from "react";
import { Component } from "react";

import SearchBar from "../containers/search-bar";
import ProductList from "../containers/product-list";

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductList />
      </div>
    );
  }
}