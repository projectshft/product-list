import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import Categories from './components/Categories'
import Prices from './components/Prices'
import ProductsListing from './components/ProductsListing';
import Paginate from './components/Paginate'

function App() {
  return (
    <div className="App">
      <h1>Ecommerce Store</h1>
      <Search/>
      <Categories/>
      <Prices/>
      <ProductsListing/>
      <Paginate/>
    </div>
  );
}

export default App;
