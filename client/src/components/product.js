import React, { Component } from 'react';

class Product extends Component {

  render() {
    return(
      <div className={"card mx-1 mt-1 text-white bg-secondary " + (this.props.product.category)} key={this.props.product.id} >
        <div className="card-header d-flex justify-content-between flex-nowrap">
          <div className="p-2">Category: {this.props.product.category}</div>
          <div className="p-2">Price: ${Math.round(this.props.product.price*.1)}</div></div>
          <img className="card-img-top" src={this.props.product.image} alt=""/>
        <div className="card-body">
          <div className="card-text text-center">{this.props.product.name}</div>

        </div>
      </div>
     )
  }
}

export default Product;

