import React from 'react';
import { Component } from 'react';
import Search from './search';
import CategorySearch from './category';
import PriceSearch from './price';
import Products from './products';
import './styles.css';

export default class HomePage extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          </div>
        <div className='row'>
          <Search />
          <CategorySearch />
          <PriceSearch />
        </div>
        <div className='row'>
          <Products />
        </div>
      </div>
    )
  }
}