//display all parts of page
//include page numbers
//include dropdown "filter by category"
//include dropdown "sort by price"

import React from 'react';
import { Component } from 'react';
import productData from '../productData.json';
import ProductGrid from './productGrid';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: productData
        }
    }

    render() {
        return (
            <div>
                <h1 >PRODUCTS</h1>
                <p>Welcome to our store!</p>

                <ProductGrid products={this.state.contacts}/>

            </div>
        )
    }
}