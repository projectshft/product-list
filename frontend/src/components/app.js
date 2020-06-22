import React from 'react';
import { Component } from 'react';

import SearchResults from '../containers/search-results';

//main app component that holds search results
export default class App extends Component {
  render() {
    return (
      <div className="col-md-8 offset-md-2">
        <h1>Products</h1>
        <div className="empty"></div>
        <SearchResults />
        
      </div>
    );
  }
}   