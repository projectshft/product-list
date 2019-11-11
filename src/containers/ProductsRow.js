import React, { Component } from "react";
import ProductsGridSquare from "../containers/ProductsGridSquare";

class ProductsRow extends Component {
  renderRow() {
    const elements = [];
    const { products } = this.props;
    for (let i = 0; i < 3; i++) {
      if (i < products.length) {
        elements.push(<ProductsGridSquare product={products[i]} key={i} />);
      } else {
        elements.push(
          <div className="col-3" key={i} style={{ clear: "both" }} />
        );
      }
    }

    return elements;
  }

  render() {
    return (
      <div
        className="row justify-content-center"
        style={{ paddingBottom: "30px" }}
      >
        {this.renderRow()}
      </div>
    );
  }
}

export default ProductsRow;
