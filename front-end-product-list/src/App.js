import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import SearchBar from './containers/search-bar';
import DisplayProducts from './containers/display-products';
import './App.css';

function App() {
  return (
    <div className="container">
      <SearchBar />
      <DisplayProducts />
    </div>
  );
}

export default App;