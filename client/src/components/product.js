//Display info for 1 product

import React from 'react';
import { Component } from 'react';

export default class Product extends Component {
    render() {
        const product = this.props.product;

        return (
            <div className="Card">
                <div class="card mb-4 shadow-sm">
                    <h5 class="card-header">
                        Category: {product.category} Price: {product.price}
                    </h5>
                </div>

                <img class="card-img-top" src={product.image} alt="Product image" />

                <div class="card-body">
                    <p class="card-text">{product.name}</p>
                </div>
            </div>
        )
    }
}