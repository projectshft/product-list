import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../Actions';
import ProductCard from './ProductCard';
import _ from 'lodash';

class ProductsList extends Component {
  componentDidMount() {
    this.props.fetchProducts({});
  }

  renderProducts() {
    //redux promise returns true when it doesn't resolve promise?
    if (this.props.products === true) {
      return <div>Uh oh something went wrong!</div>
    }

    return _.map(this.props.productData.products, product => (
      <ProductCard key={product._id} product={product} />
    ));
  }

  render() {
    return (
      <div className='container'>
        products list placeholder
        {this.renderProducts()}
      </div>
    )
  }
}

//MAPPING ALL STATE FOR TESTING, CHANGE
function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);