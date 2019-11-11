import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";

class Products extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }
    renderProducts() {
        return _.map(this.props.products, product => {
            console.log('this', this.props)
            return (
                <div className="list-group-item" key={product._id}><b>{product.name}</b>
                    <img src={product.image} alt=""></img>
                    <span className="list-group-item">${product.price}</span>
                    <span className="list-group-item">{product.category}</span>
                </div>

            );
        });
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                </div>
                <div className="list-group">
                    {this.renderProducts()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { products: state.products };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);


