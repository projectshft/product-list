import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/fetch-products';

class ProductList extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    renderProducts() {
        return this.props.products.products.map( product => {
            return (
                <Link to={`/${product._id}`} className="col text-center products" key={product._id}>
                    <img className="product-image" src={product.image} alt="" />
                    <h3>{product.name}</h3>
                    <h5>{product.category}</h5>
                    <h6>${product.price}</h6>
                </Link>
            )
        })
    }

    render() {
        if (!this.props.products.products) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div className="row">
                    {this.renderProducts()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchProducts}, dispatch)
}

const mapStateToProps = (products) => {
    return products;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);