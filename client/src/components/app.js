import React from 'react';
import { Component } from 'react';

import Category from '../containers/category';


export default class App extends Component {
  render() {
    return (
      <div>
        <h1 style={{textAlign: "center" }}>PRODUCTS</h1>
        <Category />
      </div>
    );
  }
}