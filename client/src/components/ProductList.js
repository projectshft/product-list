import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import { bindActionCreators } from 'redux';

class ProductList extends Component {
  //make sure it isn't empty
  componentDidMount(){
    this.props.fetchProducts();
  }

  render(){
    return _.map(this.props.products, product => {
      return product;
    })
  }
}

  function mapStateToProps(state) {
    return { products: state.products }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ProductList);