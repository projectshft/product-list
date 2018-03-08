import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { postProduct } from '../actions/post-product';

class NewProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            category: "",
            price: ""
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    onCategoryChange = (event) => {
        this.setState({ category: event.target.value });
    }

    onPriceChange = (event) => {
        this.setState({ price: event.target.value });
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        // create new product using information (name, category, price) user specified in input form
        this.props.postProduct(this.state.name, this.state.category, this.state.price);
        this.setState({
            name: "",
            category: "",
            price: ""
        })
        // redirect to main page
        this.props.history.push('/');
        // refresh page to ensure new product shows
        window.location.reload();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit.bind(this)} className="input-group">
                    <div className="col text-center">
                        <h1>{this.state.name ? this.state.name : 'New Product'}</h1>
                        <h3>{this.state.category ? this.state.category : ""}</h3>
                        <h5>{this.state.price ? `$${this.state.price}` : ""}</h5>
                        <hr/>
                        <input
                            placeholder="Product Name"
                            className="form-control new-product-input"
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                        <input
                            placeholder="Category"
                            className="form-control new-product-input"
                            value={this.state.category}
                            onChange={this.onCategoryChange}
                        />
                        <input
                            placeholder="Price"
                            className="form-control new-product-input"
                            value={this.state.price}
                            onChange={this.onPriceChange}
                        />
                        <button to="/" type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <hr/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ postProduct }, dispatch);
}

export default connect(null, mapDispatchToProps)(NewProduct);