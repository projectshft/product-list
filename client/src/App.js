import React from 'react';
import logo from './logo.svg';
import './App.css';
import Categories from './components/Categories'
import Paginate from './components/Paginate'

function App() {
  return (
    <div className="App">
      <h1>Eval: Fake Store</h1>
      <Categories/>
      <Paginate/>
    </div>
  );
}

export default App;
