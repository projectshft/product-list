import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProduct } from '../actions/fetch-product';
import { postReview } from '../actions/post-review';

class Product extends Component {
    constructor(props) {
        super(props)

        // fetch one product using product ID
        const { productId } = this.props.match.params;
        this.props.fetchProduct(productId)

        // for user to post a review to product
        this.state = {
            userName: "",
            text: ""
        }
    }

    onUserNameInputChange = (event) => {
        this.setState({userName: event.target.value})
    }

    onTextInputChange = (event) => {
        this.setState({text: event.target.value})
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        // post new review using username and text input fields on product detail page
        const { productId } = this.props.match.params;
        this.props.postReview(this.state.userName, this.state.text, productId);
        this.setState({
            userName: "",
            text: ""
        })
        this.props.fetchProduct(productId);
        // reload page so that new review shows
        window.location.reload();
    }

    renderReviews = () => {
        const reviews = this.props.product.product.reviews;

        // placeholder until reviews is assigned data from database
        if (!reviews) {
            return <div>Loading...</div>
        }

        // post all existing reviews
        return reviews.map((review) => {
            return (
                <div key={review._id} className="reviews">
                    <hr/>
                    <h4><b>{review.userName}:</b></h4>
                    <h5>{review.text}</h5>
                </div>
            )
        })
    }

    render() {
        // placeholder until product is assigned data from database
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
                        <img className="product-detail-image" src={product.image} alt="" />
                    </div>
                    <div className="row justify-content-center">
                        <h3>{product.category}</h3>
                    </div>
                    <div className="row justify-content-center">
                        <h5>${product.price}</h5>
                    </div>
                </div>
                <hr/>
                <hr/>
                <div>
                    <div className="row justify-content-center">
                        <h1>Reviews</h1>
                    </div>
                    {this.renderReviews()}
                </div>
                <div>
                    <hr/>
                    <form onSubmit={this.onFormSubmit.bind(this)} className="input-group">
                        <div className="col text-center">
                            <h2>Write a review:</h2>
                            <input
                                placeholder="Username"
                                className="form-control"
                                value={this.state.userName}
                                onChange={this.onUserNameInputChange}
                            />
                            <textarea
                                placeholder="Review"
                                className="form-control"
                                value={this.state.text}
                                onChange={this.onTextInputChange}
                            />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchProduct, postReview }, dispatch)
}

const mapStateToProps = (product) => {
    return product
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);