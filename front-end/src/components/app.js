import React from 'react';
import { Component } from 'react';
import ProductList from '../containers/productList';
//import GlutenFreeMakeUpList from '../containers/veganList';
import Navbar from '../containers/navbar';
import '../index.css';


export default class App extends Component {
  render() {
    return (
      <div className="row d-flex" >
        <div>
        <Navbar />
        </div>
        <div id="main-view" className="container">
        <ProductList  />
        </div>
       
        </div>
      
    )}
}
