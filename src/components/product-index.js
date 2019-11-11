import _ from 'lodash'
import React, { Component } from "react";
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions'

class ProductIndex extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderProducts() {
    return _.map(this.props.products, product => {
      return (
        <div className='product-item' key={product._id}>
          {product.name}
          {product.price}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Hello from Product Index!</h1>
        {this.renderProducts()}
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