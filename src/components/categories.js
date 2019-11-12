import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";





class Categories extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }
    render() {
        return (
            < div className="btn-group" >
                <button type="button" className="btn btn-danger">Categories</button>
                <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="localhost:8000/products?page=1&category=Games">Games</a>
                    <a className="dropdown-item" href="localhost:8000/products?page=1&category=Health">Health</a>
                    <a className="dropdown-item" href="localhost:8000/products?page=1&category=Clothing">Clothing</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="localhost:8000/products?page=1&category=Home">Home</a>
                    <a className="dropdown-item" href="localhost:8000/products?page=1&category=Electronics">Electronics</a>
                    <a className="dropdown-item" href="localhost:8000/products?page=1&category=Outdoors">Outdoors</a>
                </div>
            </div >
        );
    }
}
function mapStateToProps(state) {
    return { products: state.products };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);