import React from 'react';
import { Component } from 'react';
import ProductList from '../containers/productList'

export default class App extends Component {
  render() {
    return (
        <div id="main-view" className="container">
        <ProductList />
        </div>
    )
  }
}
