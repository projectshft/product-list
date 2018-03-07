import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/fetch-products';
import { fetchAllProducts } from '../actions/fetch-all-products';

class ProductList extends Component {
    constructor(props) {
        super(props);

        // to render default first page on load
        this.props.fetchProducts();
        // to render pagination
        this.props.fetchAllProducts();

        this.state = {
            page: "1"
        }
    }

    renderProducts() {
        return this.props.products.products.map( product => {
            return (
                <Link to={`/products/${product._id}`} className="col text-center products" key={product._id}>
                    <img className="product-image" src={product.image} alt="" />
                    <h3 className="link">{product.name}</h3>
                    <h5 className="link">{product.category}</h5>
                    <h6 className="link">${product.price}</h6>
                </Link>
            )
        })
    }

    onPageButtonClick = (event) => {
        // if user is already on page, do nothing
        if (this.state.page === event.target.value) {
            return;
        }

        // set page to clicked page
        this.setState({ page: event.target.value });
        this.props.fetchProducts(null, null, null, event.target.value);
        this.renderProducts();
    }

    renderPagination = () => {
        let pages = [];

        // render page numbers based off of how many products are in database
        const { allProducts } = this.props.allProducts;
        const numberOfPages = Math.ceil(allProducts.length / 9);

        for (let i = 1; i <= numberOfPages; i++) {
            pages.push(i.toString());
        }

        return pages.map( (number) => {
            return (
                <button key={number} onClick={this.onPageButtonClick.bind(this)} value={number} className={this.state.page === number ? "btn-link isPressed" : "btn-link"}>{number}</button>
            )
        })
    }

    render() {
        // placeholder until products is assigned data from database
        if (!this.props.products.products) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div className="row">
                    {this.renderProducts()}
                </div>
                <div>
                    <div className="row justify-content-center">
                        {this.renderPagination()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
        return bindActionCreators({fetchProducts, fetchAllProducts}, dispatch)
    }
    
    const mapStateToProps = (state) => {
        return {
            products: state.products,
            allProducts: state.allProducts
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);