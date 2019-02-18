import React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import { filterByCategory, setCurrentPage } from '../actions/actions';

const Category = ({ dispatch }) => {
    
    return (

        <div className="btn-group">
            <button type="button" className="btn btn-primary">Filter by Category</button>
            <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="sr-only">Toggle Dropdown</span>
            </button>
            <div className="dropdown-menu">
                {/* {products.map((product) => 
                    <a className="dropdown-item" href="#" key={product._id}>
                        {product.category}
                    </a>
                )} */}
                <a className="dropdown-item" href="#" onClick={(e) => {
                    dispatch(setCurrentPage(1))
                    dispatch(filterByCategory(e.target.text))
                }}>Books</a>
                <a className="dropdown-item" href="#" onClick={(e) => {
                    dispatch(setCurrentPage(1))
                    dispatch(filterByCategory(e.target.text))
                }}>Beauty</a>
                <a className="dropdown-item" href="#" onClick={(e) => {
                    dispatch(setCurrentPage(1))
                    dispatch(filterByCategory(e.target.text))
                }}>Grocery</a>
                <a className="dropdown-item" href="#" onClick={(e) => {
                    dispatch(setCurrentPage(1))
                    dispatch(filterByCategory(e.target.text))
                }}>Outdoors</a>
                <a className="dropdown-item" href="#" onClick={(e) => {
                    dispatch(setCurrentPage(1))
                    dispatch(filterByCategory(e.target.text))
                }}>Health</a>
                {/* <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Separated link</a> */}
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