import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";


//This component will give the user the option to see other pages of products 
class SortBy extends Component {
    componentDidMount() {
        this.props.fetchProducts();

    }


    renderLinks() {
        let pageLinks = [];

        for (var i = 1; i < this.props.pages + 1; i++) {
            pageLinks.push(
                <li onClick={this.fetchNewPage.bind(this, i)} className="page-item"><a className="page-link" href=".">{i}</a></li>
            )
        }
        return pageLinks;
    }

    render() {
        return (
            <div className="nextPage">
                <nav aria-label="...">
                    <ul className="pagination pagination-sm">
                        {this.renderLinks()}
                    </ul >
                </nav>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return { pages: state.pagination, category: state.category, products: state.products };

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);



