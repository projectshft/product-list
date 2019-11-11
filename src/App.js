import React from 'react';
import Products from "./components/products"
import SearchBar from "./components/searchBar"
import Categories from "./components/categories"
// import SortBy from "./components/SortBy"

function App() {
  return (
    <div className="App">
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '' }}>Products</h1>
      <Products />
      <SearchBar />
      <Categories />
      {/* <SortBy /> */}
    </div>
  );
}

export default App;
