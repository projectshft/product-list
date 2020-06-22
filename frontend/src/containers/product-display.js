import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductDisplay extends Component {

    createProductModules() {
        if (this.props.products.products && Array.isArray(this.props.products.products) && this.props.products.products.length > 0) {
            return this.props.products.products.map((product) => {
                    return (
                        <div key={product._id} className="product-module">
                            <p key={`category of ${product._id}`}>Category: <strong>{product.category}</strong></p>
                            <h2 key={`price of ${product._id}`}>{product.price}</h2>
                            <img key={`image of ${product._id}`} src={product.image} alt={product.name}></img>
                            <h1 key={`name of ${product._id}`}>{product.name}</h1>
                        </div>
                    )
            })
        } else {
            return (
                <h2>No items for that search. Try searching one complete word at a time or changing the category.</h2>
            )
        }
    }
        
    render() {
        return (
            <div className="products-container">
                {this.createProductModules()}
            </div>    
        );
    }
}


function mapStateToProps({ products }) {
    return { products };
}

export default connect(mapStateToProps)(ProductDisplay);