import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/fetch-products';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: "",
            category: "",
            sortBy: ""
        };
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

        this.props.fetchProducts(this.state.term, this.state.category, this.state.sortBy);
        this.setState({ term: "" });
        <Redirect to='/' />
    }

    renderCategories = () => {
        const { products } = this.props.products;
        let categories = [];

        for (let i = 0; i < products.length; i++) {
            if (categories.indexOf(products[i].category) == -1) {
                categories.push(products[i].category);
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

    render() {
        if (!this.props.products.products) {
            return (
                <div> </div>
            )
        }

        return (
            <div>
                <Link to='/' className="row justify-content-center" style={{textDecoration: 'none'}}>
                    <h1 className="link">PRODUCTS</h1>
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

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchProducts }, dispatch);
}

const mapStateToProps = (products) => {
    return products;
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);