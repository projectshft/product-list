import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadProducts } from '../actions';
import { bindActionCreators } from 'redux';
import placeholder from '../assets/placeholder.png'

class ProductView extends Component {
  constructor(props) {
    super(props) 
    }
    
    makeProductsDiv() {
    if (this.props.products.products) {
    return this.props.products.products.map(product => {
      return (
        <div className="flex-fill">
        <div className="prod-category-price-box">
            <div className="prod-category">Category: {product.category}</div>
            <div className="prod-price">${product.price}</div>
        </div>
        <div className="prod-image-box">
            <img src={placeholder} className="prod-image" alt="Card image cap"></img>
          </div>
          <div className="prod-name">{product.name}</div>
        </div>
      );
    })
  } else {
    return (
      <div>Loading...</div>
    )
  }
  }

  render() {
    return (
      <div className="d-flex">
        {this.makeProductsDiv()}
      </div>
    );
  }
}
function mapStateToProps({ products }) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loadProducts },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductView);