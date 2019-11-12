import _ from 'lodash'
import React, { Component } from "react";
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts, saveCurrentCategory } from '../actions'

class ProductIndex extends Component {

  componentDidMount() {
    this.props.fetchProducts(1);
  }

  // Fetches products for page number clicked
  onPageClick = (page) => {
    if(this.props.products.category) {
      alert(this.props.products.category)
    }

    this.props.fetchProducts(page.target.innerHTML);
  }

  // Fetches products for selected category
  onCategoryClick = (category) => {
    saveCurrentCategory(category.target.innerHTML)
    this.props.fetchProducts(1, category.target.innerHTML)
  }

  renderProducts() {
    return _.map(this.props.products.productItems, product => {
      return (
        <div className='product-item col-md-3' key={product._id}>
          <span className="text-left"> Category: {product.category}</span>
          <span className="text-right"> Price: ${product.price} </span>
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

    // Hardcode number of products(instead of 90 should use 'totalProducts')
    let pagesNeeded = Math.ceil(90/9)
    let pageArr = []
    for (let i = 1; i <= pagesNeeded; i++) {
      pageArr.push(<li className="page-item"><a className="page-link" href="#" key={i} onClick={this.onPageClick}>{i}</a></li>)
      }
      return pageArr
    }

  // Should render categories based on Redux state/store. Same problem as above with not recognizing anything in state/store.
  renderCategoryDropdowns() {
    return this.props.products.categories.map(category => {
      return (
        <a className="dropdown-item" href="#" onClick={this.onCategoryClick}>{category}</a>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-9 offset-md-2">
            <div className='page-header text-center'>
              <h1>BILLY'S PRODUCT EMPORIUM</h1>
            </div>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                CATEGORY
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {/* {this.renderCategoryDropdowns()} */}
                 <a className="dropdown-item" href="#" onClick={this.onCategoryClick}>Games</a>
                 <a className="dropdown-item" href="#">Health</a>
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
        {/* I can retrieve product count here but not in my renderPagination */}
        <h6>Product Count from database/Redux store(dynamic): {this.props.products.productCount}</h6>
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