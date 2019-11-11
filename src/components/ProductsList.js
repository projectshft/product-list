import React, { Component } from "react";
import { connect } from "react-redux";
import ProductsRow from "../containers/ProductsRow";

class ProductsList extends Component {
  renderProducts() {
    const elements = [];
    console.log(this.props);
    const { products } = this.props;
    for (let i = 0; i < products.length; i += 3) {
      elements.push(
        <ProductsRow products={products.slice(i, i + 3)} key={i} />
      );
    }

    return elements;
  }

  render() {
    return this.renderProducts();
  }
}

function mapStateToProps({ products }, ownProps) {
  return { products };
}

export default connect(
  mapStateToProps,
  null
)(ProductsList);
