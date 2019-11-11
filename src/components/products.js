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
    renderProducts() {
        return _.map(this.props.products, product => {
            return (
                <div className="list-group-item" key={product.id}>
                    <Link to={`/products/${product.id}`}>
                        {product.title}
                    </Link>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    {/* <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                     </Link> */}
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


