import React from 'react';
import Title from './Title';
import ProductList from './ProductList'
import PageOptionsHeader from './PageOptionsHeader';
import PaginationFooter from './PaginationFooter';

const App = () => (
  <div>
    <Title />
    <PageOptionsHeader />
    <ProductList />
    <PaginationFooter />
  </div>
)

export default App;