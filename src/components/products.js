import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../actions";

class Products extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }
    renderList() {
        return this.props.products.map(product => {
            return (
                <li
                    key={product.title}
                    className="list-group-item"
                >
                    {product.title}
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}


export default Products;