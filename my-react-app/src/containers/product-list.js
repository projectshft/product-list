import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProduct } from "../actions";

class ProductList extends Component {    


    renderProduct() {
        console.log("render",this.props.products[0]);
            return this.props.products.map(product => {
                return <tr>
                <br />
                <br />
                <th width="40%">
                    {product.name}
                </th>
                <th width="20%">
                    ${product.price}
                </th>
                <th width="40%">
                    Category: {product.category}
                </th>
                </tr>
            })
        }
    

    render() {
        return (
            <table className="table table-striped table-bordered table-sm" cellSpacing="0" width="80%">
                {this.renderProduct()}
            </table>
        );
    }
}

function mapStateToProps(state) {
    console.log("my state", state);
    return { products: state.products};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchProduct: fetchProduct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);