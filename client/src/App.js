import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import Categories from './components/Categories'
import Prices from './components/Prices'
import Paginate from './components/Paginate'
import ProductsListing from './components/ProductsListing';
import ProductsByCategory from './components/ProductsByCategory';

function App() {
  return (
    <div className="App">
      <h1>Ecommerce Store</h1>
      <div className="headers">      
        <Search/>
        <Categories/>
        <Prices/>
      </div>
      <ProductsListing/>
      <ProductsByCategory/>
      <Paginate/>
    </div>
  );
}

export default App;
