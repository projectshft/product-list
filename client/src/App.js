import React from 'react';
import logo from './logo.svg';
import './App.css';
import Searchbar from './components/Searchbar'
import Products from './components/Products'
import Paginate from './components/Paginate'
import Dropdown from './components/Dropdown';

function App() {
  return (
    <div className="App">
      <h1>Store</h1>
      <div className="menus">
        <Searchbar/>
        <Dropdown/>
        <Products/>
        <Paginate/>
      </div>
    </div>
  );
}

export default App;
