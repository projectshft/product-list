import React from 'react';
import { Component } from 'react';
import ProductList from '../containers/productList';
import '../index.css';

export default class App extends Component {
  render() {
    return (
      <div className="row d-flex justify-content-center" >
        <div>
        </div>
        <div id="main-view" className="container">
        <ProductList />
        </div>
      </div>
    )
  }
}
