import React, { Component } from 'react'
import SearchHeader from '../containers/search-header'
import ProductList from '../containers/product-list'

class App extends Component {
  render() {
    return (
      <div className='container'>
        <SearchHeader />
        <ProductList />
        <footer className='navbar footer footer-light content container-fluid'>
          <span className='mx-auto'><small>Coded with	&hearts; by Austin Stevens for <a href='https://projectshift.io' alt='Project Shift'>Project Shift</a></small></span>
        </footer>
      </div>
    )
  }
}

export default App
