import React from 'react';
import { Component } from 'react';

import SearchBar from '../containers/search-bar';

export default class App extends Component {
  render() {
    return (
      <div>
        <div class="container">
          <div class="row justify-content-center my-3">
            <div>
              <h1>PRODUCTS</h1>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-3">
              <SearchBar />
            </div>
            <div class="col-md-3">
              <SearchBar />
            </div>
            <div class="col-md-3">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}