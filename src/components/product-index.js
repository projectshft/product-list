import _ from 'lodash'
import React, { Component } from "react";
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions'

class ProductIndex extends Component {
  componentDidMount() {
    this.props.fetchProducts(1);
  }

  onPageClick = () => {
    alert('page 2 clicked!')
    this.props.fetchProducts(2);
  }

  renderProducts() {
    return _.map(this.props.products.productItems, product => {
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
      <div>
        <div className="row">
          <div className="col-md-9 offset-md-2">
            <div className='page-header text-center'>
              <h1>Hello from Product Index!</h1>
              <h3>Product Count: {this.props.products.productCount}</h3>
            </div>
            <div className='products-display'>
              {this.renderProducts()}
            </div>
            
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" onClick={this.onPageClick} href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
          </ul>
        </nav>
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