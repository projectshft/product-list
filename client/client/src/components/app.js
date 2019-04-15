import React from 'react';
import { Component } from 'react';

import StoreFront from '../containers/store-front';
import ProductList from '../containers/product-list';
import Pagination from './pagination';
// import CategoryFilter from './category-filter';
import CategoryMenu from './category-menu';



export default class App extends Component {
  render() {
    return (
      <div>
        <StoreFront />
        <CategoryMenu />
        <ProductList />
        <Pagination />
      </div>
    );
  }
}
