import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/fetch-products';
import { fetchAllProducts } from '../actions/fetch-all-products';

class Header extends Component {
    constructor(props) {
        super(props);
        
        // fetch all products to use in dynamically filling the 'Categories' dropdown with all available categories in database
        this.props.fetchAllProducts();

        this.state = {
            term: "",
            category: "",
            sortBy: ""
        };
    }

    setPage = () => {
        console.log('nice')
    }

    onInputChange = (event) => {
        this.setState({ term: event.target.value });
    }

    onCategoryChange = (event) => {
        this.setState({ category: event.target.value });
    }

    onSortByChange = (event) => {
        this.setState({ sortBy: event.target.value });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        // fetch list of products using information (category, search, price) user specified in header
        this.props.fetchProducts(this.state.term, this.state.category, this.state.sortBy);
        this.setState({ term: "" });
    }

    renderCategories = () => {
        // a placeholder until allProducts is assigned data from database
        if (!this.props.allProducts.allProducts) {
            return;
        }

        const { allProducts } = this.props.allProducts;
        let categories = [];

        // filter list of categories so that there are no repeats in dropdown tab
        for (let i = 0; i < allProducts.length; i++) {
            if (categories.indexOf(allProducts[i].category) === -1) {
                categories.push(allProducts[i].category);
            }
        }

        let key = 0;
        return categories.map((category) => {
            key = key + 1;
            return (
                <option key={key} value={category}>{category}</option>
            )
        })
    }

    render(){
        return(
            <div>
                <Link to='/' className="row justify-content-center" style={{textDecoration: 'none'}}>
                    <h1 className="link">PRODUCTS</h1>
                </Link>
                <Link to='/product/new' className="row justify-content-end">
                    <h6>Want to add your product?</h6>
                </Link>
                <div className="row">
                    <form onSubmit={this.onFormSubmit} className="input-group">
                        <div className="col">
                            <select className="form-control" name="Category" onChange={this.onCategoryChange}>
                                <option value=''>Select a Category</option>
                                {this.renderCategories()}
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-control" name="Sort by" onChange={this.onSortByChange}>
                                <option value=''>Sort by</option>
                                <option value='lowest'>Price: Low to High</option>
                                <option value='highest'>Price: High to Low</option>
                            </select>
                        </div>
                        <div className="col search-bar-area">
                            <input
                                placeholder="Search"
                                className="form-control"
                                value={this.state.term}
                                onChange={this.onInputChange}
                            />
                        </div>
                    </form>
                </div>
                <hr />
                {/*Used to ensure Header component persists on all pages*/}
                {this.props.children}

            </div>
         )
    }
   

}

const mapDispatchToProps = (dispatch) => {
    // fetchProducts defaults to fetching products by page and is used to render product list to ProductList container
    // fetchAllProducts does not limit products by page, category, search, or price, and is used to render categories
    // in dropdown and render pagination numbers to ProductList container
    return bindActionCreators({ fetchProducts, fetchAllProducts }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        allProducts: state.allProducts
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);