import React, {Component} from "react";

//build a single product section to render on the page in the grid
class ProductDetail extends Component {
    
  render () {
  if (!this.props.product) {
      return <div></div>;
    }
    return (
      <div className = "card col-sm-4 product">
        <img className="card-img-top" alt={this.props.product.name} src={this.props.product.image}></img>
        <div className="card-body">
        <h4 className="card-title">{this.props.product.name}</h4>
        <p className="card-subtitle"><strong>Price: </strong> ${this.props.product.price}</p>
        <p><em>{this.props.product.category}</em></p>
      </div>
      </div>
    );
  }
}

export default ProductDetail;