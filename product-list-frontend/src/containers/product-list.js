import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts, fetchProductsCount, updatePageNumber } from '../actions'

const PRODUCTS_PER_PAGE = 9

class ProductList extends Component {

  componentWillMount() {
    this.props.fetchProducts(this.props.requestUrl)
    this.props.fetchProductsCount(this.props.requestUrl)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.requestUrl !== nextProps.requestUrl) {
      this.props.fetchProducts(this.props.requestUrl)
      this.props.fetchProductsCount(this.props.requestUrl)
    }
  }

  onPageItemClick = (event) => {
    event.preventDefault()
    this.props.updatePageNumber(event.target.dataset.id)
  }

  renderPaginationLinks() {
    let pageNumbers = []
    let productCount = this.props.productCount
    let numberOfPages = Math.ceil(productCount / PRODUCTS_PER_PAGE)
    for (let i = 1; i <= numberOfPages; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers.map( pageNumber => {
      return (
        <li className='page-item' key={pageNumber} onClick={this.onPageItemClick}><button type='button' className='btn-link page-link rounded-0' data-id={`${pageNumber}`}>{pageNumber}</button></li>
      )
    })
  }

  renderProducts() {
    return this.props.productList.map( product => {
      return (
        <div className='col-sm-4 mx-auto' key={product._id}>
          <div className='mb-1'>
            <span className='text-left'>Category: {product.category}</span>
            <span className='float-right'><strong>${product.price}</strong></span>
          </div>
          <div className='text-center'>
            <img className='product-image img-thumbnail' src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </div>
        </div>
      )
    })
  }

  render() {
    const productList = this.props.productList

    if (!productList) {
      return (
        <div className='text-center'>
          <img className='product-image' src='https://www.fatherly.com/wp-content/themes/grandfather/images/loading.gif' alt='Loading...' />
        </div>
      )
    }

    return (
      <div>
        <div className='row justify-content-center'>
          <nav className='mt-3'>
            <ul className='pagination'>
              {this.renderPaginationLinks()}
            </ul>
          </nav>
        </div>
        <div className='row'>
          {this.renderProducts()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    productList: state.products.productList,
    productCount: state.products.productCount,
    requestUrl: state.requestUrl
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, fetchProductsCount, updatePageNumber }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)