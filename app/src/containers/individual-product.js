import React from 'react';
import { Component } from 'react';


export default class IndividualProductDiv extends Component {
  render() {
    let products = this.props.products;
    let url = products[0].img
    return (
      <div className="col-md-4">
        <div>
          <div>{products[0].category}{products[0].price}</div>
          <div><img src={url}></img></div>
          <div>{products[0].name}</div>
        </div>
      </div>
    )
  }
}