import React, {Component} from 'react';

class Product extends Component {
  
  //
  render() {
    return (
      <div className="card" >
        <div className="card-header d-flex justify-content-between">
          <h6>Category: {this.props.product.category}</h6>
          <h6>Price: ${this.props.product.price}</h6>
        </div>
        <img className="card-pic" src={this.props.product.image} alt="product"/>
        <div className="card-body">
          <h5>{this.props.product.name}</h5>
        </div>
      </div>
    )
  }
}

export default Product;