import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";

// This component gives the ability for the 
// user to sort by highest or lowest price
class SortBy extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    // This function takes in the sort query  
    sortPrice(sort) {

        let page = this.props.page;
        let category = this.props.category;

        this.props.fetchProducts(category, sort, page);

    }



    render() {
        return (

            <div className="dropdown">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort-By
                 </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" onClick={e => { e.preventDefault(this.sortPrice("highest")) }} href=".">Highest-Price</a>
                    <a className="dropdown-item" onClick={e => { e.preventDefault(this.sortPrice("lowest")) }} href=".">Lowest-Price</a>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state) {
    return { pages: state.pagination, category: state.category, products: state.products };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SortBy);