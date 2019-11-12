import _ from 'lodash'
import React, { Component } from "react";
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions'

class ProductIndex extends Component {

  componentDidMount() {
    this.props.fetchProducts(1);
  }

  // Fetches products for page number clicked
  onPageClick = (page) => {
    this.props.fetchProducts(page.target.innerHTML);
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
  // I can pull from state/store but only in return statements. Need to use loop logic in return somehow
  renderPagination() {
    // Determine number of pages needed based on num of products in database
    // Why is this empty? shrug
    let totalProducts = this.props.products.productCount
    // Rounds up for last page of products doesn't cut off

    // Hardcode number of products
    let pagesNeeded = Math.ceil(90/9)
    let pageArr = []
    for (let i = 1; i <= pagesNeeded; i++) {
      pageArr.push(<li className="page-item"><a className="page-link" href="#" key={i} onClick={this.onPageClick}>{i}</a></li>)
      }
      return pageArr
    }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-9 offset-md-2">
            <div className='page-header text-center'>
              <h1>Hello from Product Index!</h1>
              {/* I can retrieve product count here but not in my renderPagination */}
              <h3>Product Count from database/Redux store: {this.props.products.productCount}</h3>
            </div>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown button
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </div>

            <div className='products-display'>
              {this.renderProducts(10)}
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