import React, { Component } from 'react';
import FilterSortPaginate from './FilterSortPaginate';
import ProductShowcase from './ProductShowcase';
import './App.css';
// import Pagination from './Pagination';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>
          <strong>Products</strong>
        </h1>
        {/* <hr /> */}
        <div>
          <FilterSortPaginate />
          <ProductShowcase />
          {/* <Pagination /> */}
        </div>

        <img
          className="mern-icon"
          src="https://s3-us-west-2.amazonaws.com/cosmicjs/5864c430-bf05-11e7-b4e6-bb80e0778af9-1741229_1.jpg"
          width="150"
          height="150"
          alt=""
        />
      </div>
    );
  }
}

export default App;
