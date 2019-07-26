import React, { Component } from "react";

class Product extends Component { 

  render() {
    return (
      <li key={this.props.product._id} className="list-group-item">
          {this.props.product.name}
      </li>
    )
  }
}

export default Product
