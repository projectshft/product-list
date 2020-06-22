import React from 'react';
import SearchBars from '../containers/search-bars'
import { Component } from 'react';
import Footer from './footer'

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBars />
        <Footer />
      </div>
    );
  }
}
