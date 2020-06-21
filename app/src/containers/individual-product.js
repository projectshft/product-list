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
      <div className="col-md-4">
        <div>
          <div>{product.category}{product.price}</div>
          <div><img src={product.image}></img></div>
          <div>{product.name}</div>
        </div>
      </div>
    )
  }
}