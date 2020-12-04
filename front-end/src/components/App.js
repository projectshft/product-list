import React from 'react';
import Pagination from '../containers/pagination';
import ProductList from '../containers/product-list';
import SearchFilterSort from '../containers/search-filter-sort';
import '../CSS/App.css'

const App = () => {
  return (
    <div>
        <SearchFilterSort></SearchFilterSort>
        <ProductList></ProductList>
        <div  className='col-md-12 offset-2'>
        <Pagination></Pagination>    
        </div>
    </div>
  );
}

export default App;
