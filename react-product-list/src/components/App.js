import React from 'react';
import { Component } from 'react';
import SearchBar from '../containers/searchbar';
import CategoryFilter from '../containers/category';
import PriceSort from '../containers/price';
import Products from './products';
import '../index.css';


export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <h1>PRODUCTS</h1>
          </div>
        <div className='query row'>
          <SearchBar />
          <CategoryFilter />
          <PriceSort />
        </div>
        <div className='row'>
          <Products />
        </div>
      </div>
    )
  }
}
