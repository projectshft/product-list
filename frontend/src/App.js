import React from 'react';
import Title from './Components/Title';
import SearchOptions from './Components/SearchOptions';
import ProductsList from './Components/ProductsList';

function App() {
  return (
    <div className="App">
      <Title />
      <SearchOptions />
      <ProductsList />
    </div>
  );
}

export default App;
