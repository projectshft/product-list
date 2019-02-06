//display all parts of page
//include page numbers
//include dropdown "filter by category"
//include dropdown "sort by price"

import React from 'react';
import { Component } from 'react';
// import ProductData from '../productData.json';
import ProductGrid from './productGrid';
import PageNumber from './pageNumber';
const axios = require('axios');

const url = 'localhost:8000/products';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoading: false,
            error: null

        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios.get(url)
            .then(response => this.setState({
                products: response,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }))
    }



    pageRequest(page) {
        this.setState({ isLoading: true });

        const params = {
            page: page
        };

        axios.get(url, { params: params })
            .then(response => this.setState({
                products: response,
                isLoading: false
            }))
        console.log('response:', response)
            .catch(error => this.setState({
                error,
                isLoading: false
            }))
    }

    render() {
        return (
            <div>
                <h1 >PRODUCTS</h1>
                <p>Welcome to our store!</p>

                <ProductGrid products={this.state.products} />
                <PageNumber onPageSelect={this.pageRequest} />
            </div>
        )
    }
}
