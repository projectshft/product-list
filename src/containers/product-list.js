import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';

class ProductList extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    renderProducts() {
        if (this.props.products.products) {
            return this.props.products.products.map( product => {
                return (
                    <div className="col text-center products" key={product._id}>
                        <img className="product-image" src={product.image} />
                        <h3>{product.name}</h3>
                        <h5>{product.category}</h5>
                        <h6>${product.price}</h6>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Product List</h1>
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