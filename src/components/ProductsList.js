import React, { Component } from "react";
import { connect } from "react-redux";
import ProductsRow from "../containers/ProductsRow";

class ProductsList extends Component {
  renderProducts() {
    const elements = [];
    const { productsList } = this.props.products;
    for (let i = 0; i < productsList.length; i += 3) {
      elements.push(
        <ProductsRow products={productsList.slice(i, i + 3)} key={i} />
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
