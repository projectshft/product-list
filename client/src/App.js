import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { fetchProducts } from './actions/index'
import Products from './containers/Products';

class App extends Component {

  componentDidMount() {
    // this.props.fetchProducts();
    this.props.fetchProducts()
  }


  componentDidUpdate() {
    console.log('pros is ', this.props)
  }


  render() {
    return (
      <div>
        <Products />
        <h1>Hello</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: state.products }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProducts }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);