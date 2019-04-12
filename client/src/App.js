import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { fetchProducts } from './actions/index'
import Products from './containers/Products';
import SearchBar from './containers/searchBar';

class App extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }


  render() {
    return (
      <div>
        <SearchBar />
        <Products />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProducts }, dispatch)
};

export default connect(null, mapDispatchToProps)(App);