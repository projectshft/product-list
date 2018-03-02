import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProduct } from '../actions/fetch-product';
import { fetchReviews } from '../actions/fetch-reviews';

class Product extends Component {
    componentDidMount() {
        const { productId } = this.props.match.params;
        this.props.fetchProduct(productId)
        this.props.fetchReviews()
    }

    renderReviews = () => {
        console.log(this)

        return (
            <div>
                <h1>Reviews</h1>
            </div>
        )
    }

    render() {
        if (!this.props.product.product) {
            return <div>Loading...</div>
        }

        const { product } = this.props.product;

        return (
            <div>
                <div>
                    <div className="row justify-content-center">
                        <h1 className="product-detail-name">{product.name}</h1>
                    </div>
                    <div className="row justify-content-center">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="row justify-content-center">
                        <h3>{product.category}</h3>
                    </div>
                    <div className="row justify-content-center">
                        <h5>{product.price}</h5>
                    </div>
                </div>
                <div>
                    {this.renderReviews()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchProduct, fetchReviews }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        reviews: state.reviews
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);