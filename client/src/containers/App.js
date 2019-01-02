import React, { Component } from 'react';
import SearchBar from './search_bar';
import ProductList from './product-list'
import Pagination from '../components/pagination'

import { connect } from 'react-redux.1'
import {getProducts} from '../actions/types'
import { bindActionCreators } from 'redux';

class App extends Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    return (
      <div className="App container container-fluid">
          <h1 id="heading">
          PRODUCTS
          </h1>
          <div className="row">
            < SearchBar />
            < ProductList />
            < Pagination />
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return state
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getProducts}, dispatch)
};



export default connect(null, mapDispatchToProps)(App);
