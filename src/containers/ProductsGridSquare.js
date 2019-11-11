import React, { Component } from "react";

class ProductsGridSquare extends Component {
  render() {
    return (
      <div className="col-3" style={{ clear: "both" }}>
        <div>
          <span style={{ float: "left" }}>Category: Games</span>
          <span style={{ float: "right" }}>$50</span>
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
          <span>PRODUCT NAME HERE</span>
        </div>
      </div>
    );
  }
}

export default ProductsGridSquare;
