
import React, { Component } from 'react';

import ProductDetail from '../components/ProductDetail';

class Products extends Component {

  render() {

    return (
      <div className="container">
        <div className="row">
          <ProductDetail />
        </div>
      </div>
    )
  }
};

export default Products;