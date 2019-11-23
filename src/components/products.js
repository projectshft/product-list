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
            return (
                <>
                    <img src={product.image} className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title" key={product._id}><b>{product.name}</b>${product.price}</h5>
                        <p className="card-text">Category: {product.category}</p>
                    </div>
                </>
            );

        });
    }

    render() {
        return (
            <div className="row">
                <div className="card" style={{ width: `15rem` }}>
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


