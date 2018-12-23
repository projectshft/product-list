import React, {Component} from "react";

//build a single product section to render on the page in the grid
class ProductDetail extends Component {
    
  render () {
  if (!this.props.product) {
      return <div></div>;
    }
    return (
      <div className = "card list-group col-sm-4">
        <img alt={this.props.product.name} src={this.props.product.image}></img>
        <h4>{this.props.product.name}</h4>
        <p>Price: {this.props.product.price}</p>
        <p><em>{this.props.product.category}</em></p>
      </div>
    );
  }
}

export default ProductDetail;