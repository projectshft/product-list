import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';

class ProductShowcase extends Component {
  render() {
    return (
      <div className="product-showcase-container">
        <div>
          {this.props.products.map(product => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ productInfo }) {
  return {
    products: productInfo.products || []
  };
}

export default connect(mapStateToProps)(ProductShowcase);
