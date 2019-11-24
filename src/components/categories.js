import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";

// This drop down will return certain categories for the user 
class Categories extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }


    render() {
        console.log('categories', this.props)
        return (
            < div className="btn-group" >
                <button type="button" className="btn btn-success" >Categories</button>
                <button type="button" className="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="x">Games</a>
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Health">Health</a>
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Clothing">Clothing</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Home">Home</a>
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Electronics">Electronics</a>
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Outdoors">Outdoors</a>
                </div>
            </div >
        );
    }
}
function mapStateToProps(state) {
    return { pages: state.pagination, category: state.category, products: state.products };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);