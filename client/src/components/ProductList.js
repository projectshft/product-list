import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import { bindActionCreators } from 'redux';
import Product from './Product';

class ProductList extends Component {
  //first request on page load
  componentDidMount() {
    let sort = '';
    let category = '';
    let page = 1;
    this.props.fetchProducts(page, sort, category);
  }

  renderProducts() {
    // Error message in response to error status being set in state due to response from server
    if (this.props.error.errorMessage) {
      return (
        <div className='card-body text-center'>{this.props.error.errorMessage}</div>
      )
    }  // Error message in case no products are returned
    else if (Object.keys(this.props.products).length === 0) {
      return (
        <div><h3>No products returned.</h3></div>
      )
    }
    else {
      return _.map(this.props.products, product => {
        return (
          <div className='col-md-4'>
            <Product key={product._id} product={product} />
          </div>
        )
      })
    }
  }
  render() {
    return (
      <div className='container'>
        <div className='row'>
          {this.renderProducts()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { products: state.products, error: state.error }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);