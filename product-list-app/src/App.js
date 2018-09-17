import React, { Component } from 'react';
import SearchBar from './components/search-bar';
import DropDown from './components/dropdown';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <DropDown />
      </div>
    );
  }
}

export default App;
