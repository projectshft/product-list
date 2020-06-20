import React from 'react';
import { Component } from 'react';
import SearchFilterSortBar from '../containers/search-filter-sort-bar'
import ProductContainer from '../containers/product-container'
import PaginationComponent from '../containers/pagination'


//this will be a stateless component as it is only responsible for rendering the search/filter/sort bar, the product container and the pagination component
export default class MainPage extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">PRODUCTS</h1>
        <SearchFilterSortBar />
        <ProductContainer products={this.props.products} />
        <PaginationComponent products={this.props.products} />
      </div>
    );
  }
}