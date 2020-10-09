import React, { Component } from 'react';

import SearchBar from '../containers/search-bar';
// import CategoryDropDown from '../containers/category-dropdown';
// import SortDropDown from '../containers/sort-dropdown';
// import Pagination from '../containers/pagination';
import ProductList from '../containers/product-list';
import CategoryDropdown from '../containers/category-dropdown';
import SortProducts from '../containers/sort-products'

class App extends Component {
  render() {
    return (
      <div>
       <span><SearchBar /><CategoryDropdown /><SortProducts /></span>
       <ProductList />
      </div>
    );
  }
}

export default App;
