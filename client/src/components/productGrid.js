//display a set of 9 products

import React from 'react';
import { Component } from 'react';
import Product from './product';

export default class ProductGrid extends Component {
    render() {

        return(
        <section className="Grid album py-5 bg-light">
            <div class="container">
                <div class="row">
                {/* this will probably return all the same product */}
                    <div class="col-md-4"><Product /></div>
                    <div class="col-md-4"><Product /></div> 
                    <div class="col-md-4"><Product /></div>

                    <div class="col-md-4"><Product /></div>
                    <div class="col-md-4"><Product /></div> 
                    <div class="col-md-4"><Product /></div>

                    <div class="col-md-4"><Product /></div>
                    <div class="col-md-4"><Product /></div> 
                    <div class="col-md-4"><Product /></div>
                </div>
            </div>
        </section>
        );
        }
    }