import React, { Component } from 'react';
import SearchBar from './search-bar';
import Categories from './categories';
import SortBy from './sortBy';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <h1 className="title">PRODUCTS</h1>
        </div>
        <div className="row navbar-container">
          <div className="col-md-4 navbar-item-container">
            <SearchBar />
          </div>
          <div className="col-md-4 navbar-item-container">
            <Categories />
          </div>
          <div className="col-md-4 navbar-item-container">
            <SortBy />
          </div>
        </div>
      </div>
    )
  }
}
