import React from "react";

//build a single product section to render on the page in the grid
const ProductDetail = () => {
    if (!this.props.product) {
      return <div></div>;
    }

    return (
      <div className = "card">
        <img src={this.product.image}></img>
        <h4>{this.props.product.name}</h4>
        <p>Price: {this.props.product.price}</p>
        <p><em>{this.props.product.category}</em></p>
      </div>
    );
}

export default ProductDetail;