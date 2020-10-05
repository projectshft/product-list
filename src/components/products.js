// import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";

class Products extends Component {
    componentDidMount() {
        this.props.fetchProducts();
        console.log(this.props.products)
    }

    renderProducts() {
        return _.map(this.props.products, product => {
            console.log(product)
            return (
                <li className="list-products" key={product._id}>
                    { product }
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>PRODUCTS</h1>
                <ul className="list-group">
                    {/* {this.renderProducts()} */}
                    <li>hello</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { products: state.products };
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchProducts }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);