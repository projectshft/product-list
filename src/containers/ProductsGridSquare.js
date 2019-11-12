import React, { Component } from "react";

class ProductsGridSquare extends Component {
  imgError(e) {
    e.target.onError = "";
    e.target.src = "https://via.placeholder.com/200";
    return true;
  }

  render() {
    const { product } = this.props;
    return (
      <div className="col-3 grid-item">
        <div>
          <span className="category">Category: {product.category}</span>
          <span className="price">${product.price}</span>
        </div>
        <div>
          <img
            src={product.image + "?random=" + product._id}
            onError={e => this.imgError(e)}
            className="img-fluid product-image"
            alt="Product"
          ></img>
        </div>
        <div className="text-center">
          <span>{product.name}</span>
        </div>
      </div>
    );
  }
}

export default ProductsGridSquare;
