import React from 'react';
import Pagination from '../containers/pagination';
import ProductList from '../containers/product-list';
import SearchFilterSort from '../containers/search-filter-sort';

const App = () => {
  return (
    <div>
      <div className='row'>
        <div className='col-md-6 text-center offset-3'>
          <h1>PRODUCTS</h1>
        </div>
      </div>
      <SearchFilterSort></SearchFilterSort>
      <ProductList></ProductList>
      <Pagination></Pagination>
    </div>
  );
}

export default App;
