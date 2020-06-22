import React from 'react';
import { Component } from 'react';
import Products from './components/products';
import NavBar from './components/navbar';
import Footer from './components/footer';

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
