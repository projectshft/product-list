import React from 'react';
import Pagination from '../containers/pagination';
import ProductList from '../containers/product-list';
import SearchFilterSort from '../containers/search-filter-sort';
import '../CSS/App.css'

const App = () => {
  return (
    <div>
      <div className='col-md-10 offset-1'>
<SearchFilterSort></SearchFilterSort>
<ProductList></ProductList>
<Pagination></Pagination>
      </div>
    </div>
  );
}

export default App;
