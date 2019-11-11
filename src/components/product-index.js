import React, { Component } from "react";
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions'

class ProductIndex extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderProducts() {
    return (this.props.products, product => {
      return (
        <div className='product-item'>
          {product.title}
          {product.price}
        </div>
      )
    })
  }
  
  render() {
    return (
      <div>
        <h1>Hello from Product Index!</h1>
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