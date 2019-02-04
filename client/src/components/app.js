//display all parts of page
//include page numbers
//include dropdown "filter by category"
//include dropdown "sort by price"

import React from 'react';
import { Component } from 'react';
import ProductGrid from './productGrid';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products =[

            ]
        }
    }

        render() {
            return (
                <div className="App">
                    <header>
                        <div class="collapse bg-dark" id="navbarHeader">
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm-8 col-md-7 py-4">
                                        <h4 class="text-white">About</h4>
                                        <p class="text-muted">Add some information </p>
                                    </div>
                                    <div class="col-sm-4 offset-md-1 py-4">
                                        <h4 class="text-white">Contact</h4>
                                        <ul class="list-unstyled">
                                            <li><a href="#" class="text-white">Follow on Twitter</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="navbar navbar-dark bg-dark shadow-sm">
                            <div class="container d-flex justify-content-between">
                                <a href="#" class="navbar-brand d-flex align-items-center">
                                    <strong>Our Store</strong>
                                </a>

                            </div>
                        </div>
                    </header>
                    <main role="main">
                        <section class="jumbotron text-center">
                            <div class="container">
                                <h1 class="jumbotron-heading">PRODUCTS</h1>
                                <p class="lead text-muted">Welcome to our store!</p>
                            </div>
                        </section>
                        <ProductGrid />
                    </main>
                </div>
            )
        }
    }