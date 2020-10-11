import React, { Component } from 'react';

import SearchBar from '../containers/search-bar';
// import CategoryDropDown from '../containers/category-dropdown';
// import SortDropDown from '../containers/sort-dropdown';
// import Pagination from '../containers/pagination';
import ProductList from '../containers/product-list';
import CategoryDropdown from '../containers/category-dropdown';
import SortProducts from '../containers/sort-products';

class App extends Component {
  render() {
    return (
      <div>
        <div className='row nav-bar'>
          <div className='col-sm-6'>
            <SearchBar />
          </div>
          <div className='col-sm-3'>
            <CategoryDropdown />
          </div>
          <div className='col-sm-3'>
            <SortProducts />
          </div>
        </div>
        <ProductList />
      </div>
    );
  }
}

export default App;
