import React, { Component } from "react";
import { connect } from "react-redux";

class Products extends Component {
  renderProducts() {
    return this.props.products.map(product => {
      return (
        <li key = {product._id}>
          {product.name}
        </li>

      )
    })
  }

  render() {
    return (
      <ul>
        {this.renderProducts()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products 
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Products); 