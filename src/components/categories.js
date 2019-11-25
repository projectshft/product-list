import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";

// This drop down will return certain categories for the user 
class Categories extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }


    fetchCategory(category) {

        let page = this.props.page;
        let sort = this.props.sort;

        this.props.fetchProducts(category, sort, page);

    }



    render() {
        return (
            < div className="btn-group" >
                <button type="button" className="btn btn-success" >Categories</button>
                <button type="button" className="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" onClick={e => { e.preventDefault(this.fetchCategory('Games')) }} href=".">Games</a>
                    <a className="dropdown-item" onClick={e => { e.preventDefault(this.fetchCategory('Health')) }} href=".">Health</a>
                    <a className="dropdown-item" onClick={e => { e.preventDefault(this.fetchCategory('Clothing')) }} href=".">Clothing</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={e => { e.preventDefault(this.fetchCategory('Home')) }} href=".">Home</a>
                    <a className="dropdown-item" onClick={e => { e.preventDefault(this.fetchCategory('Electronics')) }} href=".">Electronics</a>
                    <a className="dropdown-item" onClick={e => { e.preventDefault(this.fetchCategory('Outdoors')) }} href=".">Outdoors</a>
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