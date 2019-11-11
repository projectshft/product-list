import React, { Component } from "react";

class ProductsGridSquare extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="col-3" style={{ clear: "both" }}>
        <div>
          <span style={{ float: "left" }}>Category: {product.category}</span>
          <span style={{ float: "right" }}>${product.price}</span>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/200"
            className="img-fluid"
            alt="Product"
            style={{ width: "100%" }}
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
