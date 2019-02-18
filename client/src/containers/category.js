import React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import productGrid from './productGrid';

const Category = ({ dispatch }) => {

    return (

        <div class="btn-group">
            <button type="button" class="btn btn-primary">Filter by Category</button>
            <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="sr-only">Toggle Dropdown</span>
            </button>
            <div class="dropdown-menu">
                {/* {products.map((product) => 
                    <a class="dropdown-item" href="#" key={product._id}>
                        {product.category}
                    </a>
                )} */}
                <a class="dropdown-item" href="#">Books</a>
                <a class="dropdown-item" href="#">Beauty</a>
                <a class="dropdown-item" href="#">Grocery</a>
                <a class="dropdown-item" href="#">Jewelry</a>
                <a class="dropdown-item" href="#">Outdoors</a>
                <a class="dropdown-item" href="#">Health</a>
                {/* <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a> */}
            </div>
        </div>

    )
}

function mapStateToProps(state) {
    return {
        category: state.category
    };
}

export default connect(mapStateToProps)(Category);