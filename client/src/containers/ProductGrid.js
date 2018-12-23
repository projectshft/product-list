import React, { Component } from "react";
import ProductDetail from '../components/ProductDetail';
import { connect } from "react-redux";



class ProductGrid extends Component {

  //build the list of products using the product detail
  renderList() {
    return this.props.products.map((product, index) => {
      return (
        <ProductDetail key={index} product = {product} />
      );
    });
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    // inside of BookList
    return {
      products: state.products
    };
  }

export default connect(mapStateToProps)(ProductGrid);