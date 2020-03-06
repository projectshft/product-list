import React from 'react';
import { Component } from 'react';
import SearchBar from '../containers/searchbar';
import CategoryFilter from '../containers/category';
import PriceSort from '../containers/price';
import Pages from '../containers/pages';
import Products from './products';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <CategoryFilter />
        <PriceSort />
        <Products />
        <Pages />
      </div>
    )
  }
}
