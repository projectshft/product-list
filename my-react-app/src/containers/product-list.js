import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProduct } from "../actions";

class ProductList extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        console.log(this.props.fetchProduct());
        this.props.fetchProduct();
    }

    renderProduct() {
        console.log("render",this.props);
        if(this.props.products) {
            return this.props.products.map(product => {
                return (
                <li 
                    key={product.name}
                    onClick={() => this.props.fetchProduct(product)}
                    className="list-group-item product-list-item"
                >
                {product.name}
                </li>
                );
            });
        }
        else {
            return (<div>loading...</div>);
        }
    }

    render() {
        return (
            <ul className="list-group col-sm-4">
                {this.renderProduct()}
            </ul>
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