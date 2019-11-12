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
    // When functioning properly, saves current category selected to store
    // this.props.saveCurrentCategory(category.target.innerHTML)
    this.props.fetchProducts(1, category.target.innerHTML)
  }

  // Sorts products by price(currently functioning only for first page)
  onPriceSortClick = (sortBy) => {
    if (sortBy.target.innerHTML == 'Price: Highest to Lowest') {
      // empty 2nd argument is placeholder for category
      this.props.fetchProducts(1, '', 'highest')
    }
    if (sortBy.target.innerHTML == 'Price: Lowest to Highest') {
      // empty 2nd argument is placeholder for category
      this.props.fetchProducts(1, '', 'lowest')
    }
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


  renderPagination() {
    // Redux freaks out if I'm not returning anything on load, hence conditional. Will look later
    if (this.props.products.productCount) {
      let totalProducts = this.props.products.productCount
      // Rounds up for last page of products doesn't cut off
      let pagesNeeded = Math.ceil(totalProducts/9)
      let pageArr = []
      for (let i = 1; i <= pagesNeeded; i++) {
        pageArr.push(<li className="page-item"><a className="page-link" href="#" key={i} onClick={this.onPageClick}>{i}</a></li>)
        }
        return pageArr
      }
      else return;
    }

  // Should render categories based on Redux state/store. Same problem as above with not recognizing anything in state/store.
  renderCategoryDropdowns() {
        if(this.props.products.categories) {
            return this.props.products.categories.map(category => {
              return (
                <a className="dropdown-item" href="#" onClick={this.onCategoryClick}>{category}</a>
              )
            })
        } else {
          return;
        }
        }
        

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-9 offset-md-2">
            <div className='page-header text-center'>
              <h1>BILLY'S PRODUCT EMPORIUM</h1>
            </div>
            <div className="dropdown categories-filter">
              <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                CATEGORY
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {this.renderCategoryDropdowns()}
              </div>
            </div>
            <div className="dropdown price-filter text-right">
              <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Price sort
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                 <a className="dropdown-item" href="#" onClick={this.onPriceSortClick}>Price: Highest to Lowest</a>
                 <a className="dropdown-item" href="#" onClick={this.onPriceSortClick}>Price: Lowest to Highest</a>
              </div>
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
        {/* I can retrieve product count here but not in my renderPagination */}
        <h6>Products in database: {this.props.products.productCount}</h6>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {products: state.products, query: state.query}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductIndex)