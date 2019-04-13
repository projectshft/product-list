import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { fetchProducts } from './actions/index'
import ProductDetail from './components/ProductDetail';
import SearchBar from './containers/searchBar';
import Pagination from './components/Pagination';

class App extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        <SearchBar />
        <ProductDetail />
        <Pagination />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProducts }, dispatch)
};

export default connect(null, mapDispatchToProps)(App);