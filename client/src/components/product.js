import React, { Component } from "react";

class Product extends Component { 

  render() {
    return (
      <div key={this.props.product._id} className="list-group-item">
          <img src={this.props.product.image}></img> 
          {this.props.product.name}, {this.props.product.category}, ${this.props.product.price}
      </div>
    )
  }
}

export default Product
