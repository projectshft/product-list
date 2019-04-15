import React from 'react';
import { Component } from 'react';

import StoreFront from '../containers/store-front';
import ProductList from '../containers/product-list';
import Pagination from './pagination';
import CategoryMenu from './category-menu';
import PriceSort from './price-sort';



export default class App extends Component {
  render() {
    return (
      <div>
        <StoreFront />
        <CategoryMenu />
        <PriceSort />
        <ProductList />
        <Pagination />
      </div>
    );
  }
}
