import React, {Component} from 'react';


export default class IndividualProductDiv extends Component {
  //do we need to add a constructor to receive props?
  // waitForData() {
  //   console.log('waiting for data')
  // }
  
  render() {
    console.log('Inside IndividualProductDiv, this.props= ', this.props)
    const product = this.props.product;
  //   if (!product) {
  //     setTimeout(this.waitForData, 3000)
  // }
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