import React, { Component } from 'react';

// import SearchBar from '../containers/search-bar';
// import CategoryDropDown from '../containers/category-dropdown';
// import SortDropDown from '../containers/sort-dropdown';
// import Pagination from '../containers/pagination';
import ProductList from '../containers/product-list';

class App extends Component {
  render() {
    return (
      <div>
       <ProductList />
      </div>
    );
  }
}

export default App;
