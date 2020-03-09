import React from 'react';
import { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { getProducts, searchProducts } from "../actions/index.js"
import '../index.css'
import { Query } from 'mongoose';
import { prettyDOM } from '@testing-library/dom';

//Products component is responsible for displaying the comments page
class Products extends Component {
    constructor() {
        super()

        //Products state holds all necessary items to create
        //queries to the products database
        this.state = {
            searchTerm: "",
            price: "",
            category: "",
            page: ""
        }

        this.onEnterPress = this.onEnterPress.bind(this)
    }

    //newGetProducts checks this.state for 
    //price ordering, selected category and desired page
    //Then calls getProducts action
    //Which creates a new GET request to the server
    async newGetProducts () {
        let newQuery = {}

        if (this.state.price.length != 0) {
            newQuery.price = this.state.price
        }

        if (this.state.category.length != 0) {
            await this.setState({ page: ""})
            newQuery.category = this.state.category
        }

        if (this.state.page.length != 0) {
            newQuery.page = this.state.page
        }

        this.props.getProducts(newQuery)
    }

    //Upon component mount get all products from the server
    //And begin listening for keypresses
    componentDidMount() {
        this.props.getProducts({})
        document.addEventListener("keypress", (e) => {this.onEnterPress(e)})
    }

    //renderProducts is reponsible for rendering 
    //product cards onto the webpage
    renderProducts() {
        if (!(this.props.productsList[0] == undefined)) {
            if (this.props.productsList[0].count == 0 ) {
                return (
                    <h3 className="no-products">No products to display</h3>
                )
            } else {
                return (
                    this.props.productsList[0].products.map((product) => {
                        return (
                            <span className="product col-sm-4">
                                <div className="card-container">
                                    <span className="product-category"> Category: { product.category } </span>
                                    <span className="product-price"> ${ product.price } </span>
                                    <div className="card-inner">
                                        <img src={product.image}></img>
                                    </div>
                                    <span className="product-name" key= {product._id }> { product.name } </span>
                                </div>
                            </span>
                        )
                    })
                )
            }
        } else {
            return <div>Loading...</div>
        }
    }

    //On enter press is called with each keypress on the server
    //It checks for enter key presses
    //If the enter key pressed and a search term has been entered
    //the searchProducts action is called
    onEnterPress(event) {
        if (event.key == "Enter") {
            event.preventDefault()
            if (this.state.searchTerm.length != 0) {
                this.props.searchProducts(this.state.searchTerm)
            }
        }
    }

    //renderSearchBar adds the search bar, categories dropdown
    //and price sort dropdown
    renderSearchBar() {
        return (
            <div>
                <span>
                    <form className="input-group search-bar">
                        <input
                            placeholder="Search"
                            className="form-control"
                            ref="productSearch"
                            onChange={event => {this.setState({ searchTerm: event.target.value})}}
                        />
                    </form>
                </span>
                <span>
                    <select className="category-dropdown" onChange={event => {this.setState({ category: event.target.value }, () => {this.newGetProducts()})}} id="category">
                        <option value="">All</option>
                        <option value="automotive">Automotive</option>
                        <option value="baby">Baby</option>
                        <option value="beauty">Beauty</option>
                        <option value="books">Books</option>
                        <option value="clothing">Clothing</option>
                        <option value="computers">Computers</option>
                        <option value="electronics">Electronics</option>
                        <option value="games">Games</option>
                        <option value="garden">Garden</option>
                        <option value="grocery">Grocery</option>
                        <option value="health">Health</option>
                        <option value="home">Home</option>
                        <option value="industrial">Industrial</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="kids">Kids</option>
                        <option value="movies">Movies</option>
                        <option value="music">Music</option>
                        <option value="outdoors">Outdoors</option>
                        <option value="shoes">Shoes</option>
                        <option value="sports">Sports</option>
                        <option value="tools">Tools</option>
                        <option value="toys">Toys</option>
                    </select>
                </span>
                <span>
                    <select className="price-sort-dropdown" onChange={event => {if (event.target.value != "Sort by") {this.setState({ price: event.target.value }, () => {this.newGetProducts()})}}} id="category">
                        <option value="Sort by">Sort by</option>
                        <option value="highest">Price: High to Low</option>
                        <option value="lowest">Price: Low to High</option>
                    </select>
                </span>
            </div>
        )
    }

    //renderPagination renders page numbers on the bottom of the page
    //based on the number of products returned from the server
    //on clicking the page number state.page is updated
    //and newGetProducts is called.
    renderPagination() {
        if (!(this.props.productsList[0] == undefined)) {
            let pageCount = Math.ceil(this.props.productsList[0].count / 9)
            let pages = []

            for (var i = 0; i < pageCount; i++) {
                pages.push(i + 1)
            }

            return pages.map((page) => {
                return (<button onClick={event => {this.setState({ page: page }, () => {this.newGetProducts()})}} key={ page }>{ page }</button>)
            })
        }
    }

    //Products render function renders a header and then 
    //calls renderSearchBar, renderProducts and renderPagination
    render() {
        return (
            <div>
                <div>
                    <h1 className="page-title">Products</h1>
                </div>
                <div>
                    { this.renderSearchBar() }
                </div>
                <div className="row">
                    { this.renderProducts() }
                </div>
                <br></br>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="pagination col-6">
                        { this.renderPagination() }
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        )
    }
}

//mapStateToProps passes in the productsList from reducers/index.js
//into this.props
function mapStateToProps(state) {
    return {
      productsList: state.productsList
     }
}

//mapDispatchToProps passes getProducts and searchProducts 
//from actions/index.js into this.props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProducts, searchProducts }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Products)