import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";
import Product from "./product";
import { getProducts, getMaxPages, getCategory, getPrice, getPage } from "../selectors"

class App extends Component {
  constructor() {
    super()
    this.handlePageSelect = this.handlePageSelect.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handlePriceSelect = this.handlePriceSelect.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  renderList() {
    if (!this.props.products || this.props.products.length === 0) {
      return <div className="col-md-12"><div className="products-placeholder">No products found.</div></div>
    }
    return this.props.products.map((product) => {
      return (
        <Product product={product} key={product._id} />
      )
    })
  }

  handlePageSelect(event) {
    event.preventDefault()
    this.props.fetchProducts(event.target.value, this.props.category, this.props.price)
  }

  handleCategorySelect(event) {
    event.preventDefault()
    this.props.fetchProducts(this.props.page, event.target.value, this.props.price)
  }

  handlePriceSelect(event) {
    event.preventDefault()
    this.props.fetchProducts(this.props.page, this.props.category, event.target.value)
  }

  renderPagination() {
    if (!this.props.maxPages) {
      return <div></div>
    }
    let indexList = []
    for (var i = 1; i < this.props.maxPages + 1; i++) {
      indexList.push(i)
    }
    return indexList.map(index => {
      if (index === this.props.page) {
        return (
          <button type="button" className="btn btn-light active" onClick={this.handlePageSelect} key={index} value={index}>{index}</button>
        )
      }
      return (
        <button type="button" className="btn btn-light" onClick={this.handlePageSelect} key={index} value={index}>{index}</button>
      )
    })
  }

  renderCategories() {
    const categories = ["Automotive", "Baby", "Beauty", "Books", "Clothing", "Computers", "Electronics", "Games", "Garden", "Grocery", "Health", "Home", "Industrial", "Jewelery", "Kids", "Movies", "Music", "Outdoors", "Shoes", "Sports", "Tools", "Toys"]
    return categories.map((category, index) =>
      <option key={index} value={category}>{category}</option>
    )
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar justify-content-center">
          <div className="navbar-brand"><h1>PRODUCTS</h1></div>
        </nav>
        <div className="row select-row">
          <div className="col-md-4 select-div">
            <span>search </span>
            <input className="form-control" type="text" placeholder="&#xF002;" readOnly></input>
          </div>
          <div className="col-md-4 select-div">
            <span>filter by category </span>
            <select className="form-control" id="category-selection" onChange={this.handleCategorySelect} value={this.props.category || ''}>
              <option value="">All</option>
              {this.renderCategories()}
            </select>
          </div>
          <div className="col-md-4 select-div">
            <span>sort by price </span>
            <select className="form-control" id="category-selection" onChange={this.handlePriceSelect} value={this.props.price || ''}>
              <option value="">Select</option>
              <option value="lowest">Low to High</option>
              <option value="highest">High to Low</option>
            </select>
          </div>
        </div>
        <div className="row">
          {this.renderList()}
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="pagination">
              {this.renderPagination()}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  console.log(state.data)
  return {
    products: getProducts(state),
    category: getCategory(state),
    price: getPrice(state),
    maxPages: getMaxPages(state),
    page: getPage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);