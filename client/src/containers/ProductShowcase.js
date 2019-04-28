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

function mapStateToProps({ productMetadata }) {
  return {
    products: productMetadata.products || []
  };
}

export default connect(mapStateToProps)(ProductShowcase);
