import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from '../actions/index';
import { bindActionCreators } from "redux";

class Products extends Component {
  constructor(props) {
    super(props);

    this.props.fetchProducts();

    console.log(fetchProducts());

  }

  renderProducts() {
    let productList = [];
    if (this.props.products[0]) {
      productList = this.props.products[0].products;
    }
}

render() {
  return (
    <div className="products-container">
      {this.renderProducts()}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

function mapDispatchToProps(dispatch) {
  return {
    bindActionCreators({ fetchProducts }, dispatch);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products); 