import React from 'react';
import Pagination from '../containers/pagination';
import ProductList from '../containers/product-list';
import SearchFilterSort from '../containers/search-filter-sort';


const App = () => {
  return (
    <div>
<SearchFilterSort></SearchFilterSort>
<ProductList></ProductList>
<Pagination></Pagination>
    </div>
  );
}

export default App;
