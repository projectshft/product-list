import React, { Component } from 'react';
class ProductCard extends Component {
  render() {
    return (
      <div className="product-card-container">
        <div>
          {/* Category name and product price above image */}
          <span className="product-card product-category justify-right">
            Category: {this.props.product.category}
          </span>
          <span className="product-card product-price">
            ${this.props.product.price}
          </span>
        </div>
        <img alt={this.props.product.name} src={this.props.product.image} />
        <div className="product-card product-name">
          {/* Product name emphasized below the image */}
          {this.props.product.name}
        </div>
      </div>
    );
  }
}

export default ProductCard;
