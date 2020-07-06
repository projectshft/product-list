import React, {Component} from 'react';

/* This component is responsible for rendering only one product. It should be 
   limited to receiving info for one product only, which is passed from the product-
   container component. This component will be initialized and rendered the number of
   times it needs to appear on the page (up to 9)
*/   
export default class IndividualProductDiv extends Component {
  
  render() {
    const product = this.props.product;

    return (
      <div>
        <div className="whole-product-div">
          <div className="product-div"><span className="category">Category: {product.category}</span><span className="price">${product.price}</span></div>
          <div className="img-div"><img src={product.image}></img></div>
          <div className="product-div"><span className="product-name">{product.name}</span></div>
        </div>
      </div>
    )
  }
}