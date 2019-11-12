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

  // NOTE THIS DOESN'T WORK
  // After hours of debugging and googling I've no idea why I can't pull this from Redux store/state
  // totalProducts is empty... but using redux devtools I'm pointing at the right spot. WHY tho
  renderPagination() {
    // Determine number of pages needed based on num of products in database
    let totalProducts = this.props.products.productCount
    // Rounds up for last page of products doesn't cut off
    let pagesNeeded = Math.ceil(totalProducts/9)
    for (let i = 1; i <= pagesNeeded; i++) {
      return (
        <li className="page-item"><a className="page-link" href="#">{i}</a></li>
        )
      }
    }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-9 offset-md-2">
            <div className='page-header text-center'>
              <h1>Hello from Product Index!</h1>
              <h3>Products: placeholder</h3>
            </div>
            <div className='products-display'>
              {this.renderProducts()}
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {this.renderPagination()}
            {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" onClick={this.onPageClick} href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li> */}
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