import React, { Component } from "react";

class Product extends Component {

  render() {
    return (
      <div className="col-md-4" key={this.props.product._id}>
        <div className="card">
          <div className="card-header bg-transparent border-0">
            <span>Category: {this.props.product.category}</span>
            <span className="price-span">${this.props.product.price}</span>
          </div>
          <div className="card-body ">
            <img className="card-img img-fluid" src={this.props.product.image} alt=""></img>
          </div>
          <div className="card-footer bg-transparent border-0">
            {this.props.product.name}
          </div>
        </div>
      </div>
    )
  }
}

export default Product
