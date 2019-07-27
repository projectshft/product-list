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
    if (!this.props.products) {
      return <div>loading products...</div>
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
      return <button href="#">1</button> 
    }
    let indexList = []
    for (var i = 1; i < this.props.maxPages+1; i++) {
      indexList.push(i)
    }
    return indexList.map(index => {
      return (
        <button href="#" onClick={this.handlePageSelect} key={index} value={index}>{index}</button>
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
    //const categories = ["Automotive", "Baby", "Beauty", "Books", "Clothing", "Computers", "Electronics", "Games", "Garden", "Grocery", "Health", "Home", "Industrial", "Jewelery", "Kids", "Movies", "Music", "Outdoors", "Shoes", "Sports", "Tools", "Toys"]
    return (
      <div className="App">
        <h1>Products</h1>
        <select className="form-control" id="category-selection" onChange={this.handleCategorySelect} value={this.props.category || ''}>
          <option value="">All</option>
          {this.renderCategories()}
        </select>
        <select className="form-control" id="category-selection" onChange={this.handlePriceSelect} value={this.props.price || ''}>
          <option value="">Select</option>
          <option value="lowest">Price: Low to High</option>
          <option value="highest">Price: High to Low</option>
        </select>
        <div className="list-group">
          {this.renderList()}
        </div>
        <div className="pagination">
          {this.renderPagination()}
        </div>
      </div>
    );
  }

}


// function mapStateToProps(state) {
//   return { products: state.products };
// }

function mapStateToProps(state) {
  console.log(state.data)
  return {
    products: getProducts(state),
    category: getCategory(state),
    price: getPrice(state),
    maxPages: getMaxPages(state),
    getPage: getPage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);