import React from 'react';
import { Component } from 'react';

import StoreFront from '../containers/store-front';
import ProductList from '../containers/product-list';
import Pagination from './pagination';



export default class App extends Component {
  render() {
    return (
      <div>
        <StoreFront />
        <ProductList />
        <Pagination />
      </div>
    );
  }
}
