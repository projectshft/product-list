import React from 'react';
import { Component } from 'react';

import SearchBar from './containers/search-bar';
import Products from './containers/products';


export default class App extends Component {
  render() {
    return (
      <div>
        <h1>PRODUCTS</h1>
        <SearchBar />
        <Products />
      </div>
    ) 
  } 
}
