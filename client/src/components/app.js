import React from 'react';
import { Component } from 'react';
import Search from '../containers/search';
import CategorySearch from '../containers/category-search';
import PriceSearch from '../containers/price-search';
import Products from '../containers/products';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 style={{textAlign: "center" }}>PRODUCTS</h1>
        <div className="row" style={{justifyContent: "center"}}>
        <Search />
        <CategorySearch />
        <PriceSearch />
        </div>
        <div className="row">
        <Products />
        </div>
      </div>
    );
  }
}