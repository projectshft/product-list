import React from 'react';
import { Component } from 'react';

import SearchBar from './containers/search-bar';


export default class App extends Component {
  render() {
    return (
      <div>
        <h1>PRODUCTS</h1>
        <SearchBar />
      </div>
    ) 
  } 
}
