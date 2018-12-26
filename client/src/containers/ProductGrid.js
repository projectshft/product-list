import React, { Component } from "react";
import ProductDetail from './ProductDetail';
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
    if (!this.props.products || this.props.products.length === 0) {
      return <div>No products found - try a new search</div>
    } else {
      return (
        <div className="container">
        <div className="row">
        {this.renderList()}
        </div>
        </div>
      )
    }
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