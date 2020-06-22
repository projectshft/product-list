import React from 'react';
import { Component } from 'react';


import Products from './containers/products';
import NavBar from './containers/navbar';

import Footer from './containers/footer';


export default class App extends Component {
  render() {
    return (
      <div className="main-container">
        <NavBar />
        <Products />
        <Footer />
      </div>
    ) 
  } 
}
