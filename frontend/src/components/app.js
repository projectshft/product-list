import React from 'react';
import { Component } from 'react';

import SearchBar from '../containers/search-bar';
import SortDropdown from '../containers/sort-dropdown';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center my-3">
            <div>
              <h1>PRODUCTS</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <SearchBar />
            </div>
            <div className="col-md-3">
              <p>dropdown categories</p>
            </div>
            <div className="col-md-3">
              <SortDropdown />
            </div>
          </div>
        </div>
        <div className="container">
          
        </div>
      </div>
    );
  }
}