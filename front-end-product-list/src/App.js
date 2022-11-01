import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import SearchBar from './containers/Search-Bar';
import DisplayProducts from './containers/Display-Products';
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