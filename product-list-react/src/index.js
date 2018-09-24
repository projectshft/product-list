import React from "react";
import { Component } from "react";
import ProductList from "./containers/product-list";

export default class App extends Component {
  render() {
    return (
      <div>
        <ProductList />
      </div>
    );
  }
}