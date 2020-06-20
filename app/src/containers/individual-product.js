import React, {Component} from 'react';


export default class IndividualProductDiv extends Component {
  //do we need to add a constructor to receive props?

  render() {
    const product = this.props.product;

    return (
      <div className="col-md-4">
        <div>
          <div>{product.category}{product.price}</div>
          <div><img src={product.img}></img></div>
          <div>{product.name}</div>
        </div>
      </div>
    )
  }
}