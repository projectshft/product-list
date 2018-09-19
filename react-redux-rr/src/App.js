import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Products</h1>
        </header>

      
        <nav className="navbar">
        <div>
          <a>Search Bar<input /></a> <br />
          <a>Filter By Category:</a>
          <div class="dropdown">
            <a><button class="dropbtn">Dropdown 
              <i class="fa fa-caret-down"></i>
            </button></a>
            <div class="dropdown-content">
              <a>Games </a>
              <a>Health </a>
              <a>Clothing </a>
              <a>Home </a>
              <a>Electronics </a>
              <a>Outdoors </a>
            </div>
          </div> <br />
          <a>Sort By:</a>
          <div class="dropdown">
            <a><button class="dropbtn">Dropdown 
              <i class="fa fa-caret-down"></i>
            </button></a>
            <div class="dropdown-content">
              <a>Price: Low to High</a>
              <a>Price: High to Low</a>
            </div>
          </div>
        </div>
       </nav>   

        <section>Top Row</section>
          <iframe></iframe>
          <iframe></iframe>
          <iframe></iframe>

        <section>Middle Row</section>
          <iframe></iframe>
          <iframe></iframe>
          <iframe></iframe>

        <section>Bottom Row</section>
          <iframe></iframe>
          <iframe></iframe>
          <iframe></iframe>

        <footer><pre>1 2 3 4 5 6 7 8 9</pre></footer>
      </div>
    );
  }
}

export default App;
