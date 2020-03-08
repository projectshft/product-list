  import React from 'react';
import { Component } from 'react';

import Search from '../containers/search';
import Products from '../containers/products';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 style={{textAlign: "center" }}>PRODUCTS</h1>
        <div className="row">
        <Search />
        </div>
        <div className="row">
        <Products />
        </div>
      </div>
    );
  }
}