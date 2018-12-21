import React from 'react';
import ProductList from '../containers/product-list';
import ProductDetail from '../containers/product-detail';

const App = () => {
  return (
    <div>
      <ProductList />
      <ProductDetail />
    </div>
  );
};

export default App;
