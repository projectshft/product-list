import _ from 'lodash'
import React, { Component } from "react";
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions'

class ProductIndex extends Component {
  componentDidMount() {
    this.props.fetchProducts(1);
  }

  renderProducts() {
    return _.map(this.props.products, product => {
      return (
        <div className='product-item col-md-3' key={product._id}>
          <span className="text-left"> Category: {product.category}</span>
          <span className="text-right"> Price:{product.price} </span>
          <img src={product.image} className="image-fluid" />
          {product.name}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9 offset-md-2">
            <div className='page-header text-center'>
              <h1>Hello from Product Index!</h1>
            </div>
            <div className='products-display'>
              {this.renderProducts()}
            </div>
            
          </div>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {products: state.products}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductIndex)