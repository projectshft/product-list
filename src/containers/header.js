import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    }

    render() {
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
                                <option value='Grocery'>Grocery</option>
                                <option value='Health'>Health</option>
                                <option value='Garden'>Garden</option>
                                <option value='Baby'>Baby</option>
                                <option value='Games'>Games</option>
                                <option value='Clothing'>Clothing</option>
                                <option value='Home'>Home</option>
                                <option value='Electronics'>Electronics</option>
                                <option value='Outdoors'>Outdoors</option>
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

export default connect(null, mapDispatchToProps)(Header);