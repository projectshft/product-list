import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts, fetchProductsCount, fetchProductsCategories,
        updatePageNumber, updateCategoryFilter, updateSortByPrice, updateSearchQuery } from '../actions'

class SearchHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchQuery: ''
    }
  }

  componentDidMount() {
    this.props.fetchProductsCategories()
  }

  componentDidUpdate() {
    this.props.fetchProducts(this.props.requestUrl)
    this.props.fetchProductsCount(this.props.requestUrl)
  }
  
  onCategoryFilterChange = (event) => {
    this.props.updateCategoryFilter(event.target.value)
    this.props.updatePageNumber('1')
  }
  
  onSortByPriceChange = (event) => {
    this.props.updateSortByPrice(event.target.value)
  }

  onSearchInputChange = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  onSearchSubmit = (event) => {
    event.preventDefault()
    if (this.state.searchQuery && this.state.searchQuery.trim().length > 0) {
      this.props.updateSearchQuery(this.state.searchQuery)
      this.props.fetchProducts(this.props.requestUrl)
      this.props.fetchProductsCount(this.props.requestUrl)
    }
  }

  renderProductsCategories() {
    return this.props.productCategories.map( category => {
      return (
        <option value={category} key={category}>{category}</option>
      )
    })
  }
  
  render() {
    return (
      <div className='container mb-5'>
        <header className='text-center mt-2'>
          <h1 className='display-3'>PRODUCTS</h1>
          <small>esoteric artisanal goods you didn't think you needed</small>
        </header>
        <form className='form-inline justify-content-center mt-5'>
          <div className='input-group mb-2 mr-sm-4'>
            <input type='text' className='form-control rounded-0' placeholder='Search' onChange={this.onSearchInputChange} />
            <div className='input-group-append'>
              <button className='btn btn-warning rounded-0' type='submit' onClick={this.onSearchSubmit}>
                <span role='img' aria-label='Search'>&#x1f50e;</span>
              </button>
            </div>
          </div>
          <div className='form-inline mb-2 mr-sm-4'>
            <label className='form-inline mr-2' htmlFor='dropdownCategoryFilter'>
              filter by category:&nbsp;
              <select className='rounded-0' name='category' id='dropdownCategoryFilter' onChange={this.onCategoryFilterChange}>
                <option value='' >----------</option>
                {this.props.productCategories ? this.renderProductsCategories() : null /* Render categories once they are fetched */}
              </select>
            </label>
          </div>
          <div className='form-inline mb-2'>
            <label className='form-inline mr-2' htmlFor='dropdownSortByPrice'>
              sort by:&nbsp;
              <select className='rounded-0' name='price' id='dropdownSortByPrice' onChange={this.onSortByPriceChange}>
                <option value=''>PRICE</option>
                <option value='lowest'>--Low to High</option>
                <option value='highest'>--High to Low</option>
              </select>
            </label> 
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    requestUrl: state.requestUrl, 
    productCategories: state.products.productCategories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, fetchProductsCount, fetchProductsCategories,
    updatePageNumber, updateCategoryFilter, updateSortByPrice, updateSearchQuery }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader)