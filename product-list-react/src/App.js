import React from 'react';
import { Component } from 'react';


import Products from './containers/products';
import NavBar from './containers/navbar';

import Footer from './containers/footer';


export default class App extends Component {
  render() {
    return (
      <div>
        <h1>PRODUCTS</h1>
        <NavBar />
        <Products />
        <Footer />
      </div>
    ) 
  } 
}
